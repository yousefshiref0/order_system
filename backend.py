# backend.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import webbrowser
import os

# ----- CONFIG -----
DATABASE = "cafe.db"
PARTNERS_EMAILS = ["partner1@example.com", "partner2@example.com"]
EMAIL_SENDER = "youremail@gmail.com"
EMAIL_PASSWORD = "your-app-password"  # Gmail App Password

# ----- FastAPI Setup -----
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # لو عايز تحدد شبكة معينة ممكن تحط IPs هنا
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Models -----
class OrderItem(BaseModel):
    name: str
    size: str
    qty: int
    price: float

class Order(BaseModel):
    customer_name: str | None = "Guest"
    table_number: str | None = None
    takeaway: bool = False
    items: list[OrderItem]
    total: float

# ----- Database Setup -----
def init_db():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            table_number TEXT,
            takeaway INTEGER,
            items TEXT,
            total REAL,
            status TEXT,
            created_at TEXT
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            sizes TEXT,
            price REAL,
            available INTEGER
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ----- Helper Functions -----
def send_email(order: Order, order_id: int):
    subject = f"New Order #{order_id} - Hook Café"
    body = f"Order #{order_id}\nCustomer: {order.customer_name}\nTable: {order.table_number}\nTakeaway: {order.takeaway}\nTotal: {order.total}\n\nItems:\n"
    for item in order.items:
        body += f"- {item.qty} x {item.name} ({item.size}) = {item.price}\n"

    msg = MIMEMultipart()
    msg['From'] = EMAIL_SENDER
    msg['To'] = ", ".join(PARTNERS_EMAILS)
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Email sent for Order #{order_id}")
    except Exception as e:
        print(f"Failed to send email: {e}")

def print_receipt(order: Order, order_id: int):
    receipt_html = f"""
    <html>
    <head>
        <title>Receipt #{order_id}</title>
        <style>
            body {{ font-family: monospace; background: #fff; color: #000; }}
            h1 {{ color: #C9A24D; }}
        </style>
    </head>
    <body>
        <h1>Hook Café</h1>
        <p>Order #{order_id}</p>
        <p>Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}</p>
        <hr>
        <ul>
    """
    for item in order.items:
        receipt_html += f"<li>{item.qty} x {item.name} ({item.size}) = {item.price}</li>"
    receipt_html += f"""
        </ul>
        <hr>
        <p><b>Total: {order.total}</b></p>
        <p>Thank you for choosing Hook!</p>
    </body>
    </html>
    """

    filename = f"receipt_{order_id}.html"
    with open(filename, "w") as f:
        f.write(receipt_html)

    # Open in default browser to print
    webbrowser.open('file://' + os.path.realpath(filename))

# ----- API Endpoints -----
@app.post("/order")
def create_order(order: Order):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO orders (customer_name, table_number, takeaway, items, total, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        order.customer_name,
        order.table_number,
        int(order.takeaway),
        json.dumps([item.dict() for item in order.items]),
        order.total,
        "pending",
        datetime.now().strftime("%Y-%m-%d %H:%M")
    ))
    conn.commit()
    order_id = cur.lastrowid
    conn.close()

    # Send Email & Print (on this machine)
    send_email(order, order_id)
    print_receipt(order, order_id)

    return {"message": "Order created", "order_id": order_id}

@app.get("/orders")
def get_orders():
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders ORDER BY id DESC")
    rows = cur.fetchall()
    conn.close()
    orders_list = []
    for row in rows:
        orders_list.append({
            "id": row[0],
            "customer_name": row[1],
            "table_number": row[2],
            "takeaway": bool(row[3]),
            "items": json.loads(row[4]),
            "total": row[5],
            "status": row[6],
            "created_at": row[7]
        })
    return orders_list

@app.post("/orders/{order_id}/status")
def update_order_status(order_id: int, status: str):
    if status not in ["pending", "preparing", "completed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("UPDATE orders SET status=? WHERE id=?", (status, order_id))
    conn.commit()
    conn.close()
    return {"message": f"Order #{order_id} status updated to {status}"}

@app.post("/orders/{order_id}/print")
def print_order(order_id: int):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders WHERE id=?", (order_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Order not found")
    order_data = {
        "customer_name": row[1],
        "table_number": row[2],
        "takeaway": bool(row[3]),
        "items": json.loads(row[4]),
        "total": row[5]
    }
    print_receipt(Order(**order_data), order_id)
    return {"message": f"Order #{order_id} sent to printer"}