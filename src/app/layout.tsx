import "./globals.css";
import Footer from "../components/Footer"; // Ajuste o caminho conforme necessário

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="dark">
      <body className="bg-[#0a0a0a] text-[#f5f5f5] flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
      </body>
      <Footer />
    </html>
  );
}
