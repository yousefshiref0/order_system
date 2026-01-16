export function Footer() {
  return (
    <footer className="bg-black border-t border-[#D4AF37]/20 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/60">
          This site is made by{' '}
          <a
            href="https://servtopiya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:text-[#F4D03F] transition-colors underline decoration-[#D4AF37]/40 hover:decoration-[#F4D03F]"
          >
            ServTopiya
          </a>
        </p>
      </div>
    </footer>
  );
}
