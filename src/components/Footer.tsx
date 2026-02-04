export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 mt-20 border-t border-gray-100 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Seção Café Minimalista */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-600">
            Gostou do projeto?
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Se este trabalho te ajudou, considere me pagar um café. ☕
          </p>
          <a
            href="https://www.mercadopago.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs font-semibold text-gray-500 hover:text-gray-800 underline underline-offset-4 transition-colors"
          >
            Me paga um café?
          </a>
        </div>

        {/* Créditos */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] uppercase tracking-wider text-gray-400">
          <span>© {currentYear} — Todos os direitos reservados</span>
          <span className="hidden sm:block">|</span>
          <div className="flex items-center gap-1">
            <span>By</span>
            <a
              href="https://leogomesdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              Leo Gomes Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
