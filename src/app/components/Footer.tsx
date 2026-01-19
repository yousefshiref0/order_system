export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-[#C9A24D]/20 px-8 py-4 text-center">
      <p className="text-sm text-[#A0A0A0]">
        This system is made by{' '}
        <a
          href="https://servtopiya.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-300"
          style={{ color: '#C9A24D' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#D4B264')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#C9A24D')}
        >
          ServTopiya
        </a>
      </p>
    </footer>
  );
}
