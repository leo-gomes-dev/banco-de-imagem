export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-16 border-t border-gray-100 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2 text-xs md:text-sm">
        <p className="text-gray-400">
          © {currentYear} — Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-1">
          <span className="text-gray-400">Desenvolvido por</span>
          <a
            href="https://leogomesdev.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400/80 hover:text-blue-500 transition-colors duration-200 font-medium"
          >
            Leo Gomes Developer
          </a>
        </div>
      </div>
    </footer>
  );
}
