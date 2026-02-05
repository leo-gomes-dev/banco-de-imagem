import "./globals.css";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <head>
        {/* Anti-Flash: Força a cor de fundo no carregamento inicial */}
        <meta name="theme-color" content="#18181b" />
      </head>
      {/* 
          flex flex-col + min-h-screen: Empurra o footer para o final.
          m-0 p-0: Remove espaços que criam a "faixa preta".
      */}
      <body className="bg-[#18181b] text-white flex flex-col min-h-screen m-0 p-0">
        {/* O flex-grow faz o conteúdo principal "esticar" até o footer */}
        <main className="flex-grow w-full">{children}</main>

        {/* Footer integrado no fluxo, sem gap e sem bordas gritantes */}
        <Footer />
      </body>
    </html>
  );
}
