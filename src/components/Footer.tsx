export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full  border-t border-zinc-800/50 bg-[#18181B]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Texto de apoio minimalista */}
        <p className="text-[10px] mt-15  text-zinc-500 font-bold uppercase tracking-[0.3em] mb-4">
          Gostou do projeto?
        </p>

        {/* Link do Café com cor azul vibrante para destaque */}
        <a
          href="https://www.mercadopago.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 hover:text-blue-400 underline underline-offset-8 transition-all font-medium"
        >
          Me paga um café? ☕
        </a>

        {/* Créditos e Copyright */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <div className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-1">
            <span>© {currentYear}</span>
            <span className="text-zinc-800">—</span>
            <span>Todos os direitos reservados</span>
          </div>

          <div className="text-[10px] mb-16  text-zinc-500 uppercase tracking-widest">
            <span className="font-light">By </span>
            <a
              href="https://leogomesdev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-zinc-400 hover:text-white transition-colors tracking-tighter"
            >
              Leo Gomes Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
