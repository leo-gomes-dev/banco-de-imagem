import "./globals.css";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Adicione suppressHydrationWarning aqui
    <html lang="pt-br" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#18181b" />
      </head>
      <body className="bg-[#18181b] text-white flex flex-col min-h-screen m-0 p-0">
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
