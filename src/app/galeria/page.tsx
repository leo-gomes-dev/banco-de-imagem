"use client";

import { useState, useEffect } from "react";
// Subindo dois níveis para encontrar as pastas na raiz do projeto
import { SearchHeader } from "../../components/SearchHeader";
import { ImageCard } from "../../components/ImageCard";
import { PhotoModal } from "../../components/PhotoModal";
import Footer from "../../components/Footer";

// Interface para garantir a tipagem correta
interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename?: string;
}

export default function GaleriaAlunos() {
  // --- Estados de Dados ---
  const [fotos, setFotos] = useState<CloudinaryPhoto[]>([]);
  const [categoria, setCategoria] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [fotoSelecionada, setFotoSelecionada] =
    useState<CloudinaryPhoto | null>(null);

  // --- Estados de Paginação ---
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // --- Lógica de Fetch ---
  const carregarImagens = async (cursor: string | null = null) => {
    setLoading(true);
    try {
      // Uso de encodeURIComponent para evitar erro em tags com espaços ou acentos
      const baseUrl = `/api/photos?tag=${encodeURIComponent(categoria)}`;
      const url = cursor ? `${baseUrl}&cursor=${cursor}` : baseUrl;
      const res = await fetch(url);
      const data = await res.json();

      setFotos(Array.isArray(data.resources) ? data.resources : []);
      setNextCursor(data.next_cursor || null);
    } catch (err) {
      console.error("Erro ao carregar fotos:", err);
      setFotos([]);
    } finally {
      setLoading(false);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Reset total ao mudar de categoria
  useEffect(() => {
    setCursorHistory([]);
    setCurrentIndex(0);
    carregarImagens(null);
  }, [categoria]);

  // --- Handlers de Paginação ---
  const handleNextPage = () => {
    if (nextCursor) {
      setCursorHistory((prev) => [
        ...prev,
        cursorHistory[currentIndex] || null,
      ]);
      setCurrentIndex((prev) => prev + 1);
      carregarImagens(nextCursor);
    }
  };

  const handlePrevPage = () => {
    if (currentIndex > 0) {
      const prevCursor = cursorHistory[currentIndex - 1];
      const newHistory = [...cursorHistory];
      newHistory.pop();
      setCursorHistory(newHistory);
      setCurrentIndex((prev) => prev - 1);
      carregarImagens(prevCursor);
    }
  };

  // --- Lógica de Download ---
  const handleDownload = (url: string) => {
    const downloadUrl = url
      .replace("/f_auto,q_auto/", "/")
      .replace(/\.[^/.]+$/, ".png")
      .replace("/upload/", "/upload/fl_attachment/");

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", `recurso-${Date.now()}.png`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 w-full flex-grow">
        <SearchHeader
          categoria={categoria}
          setCategoria={setCategoria}
          currentIndex={currentIndex}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[450px]">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="animate-pulse bg-gray-100 h-64 rounded-xl shadow-inner"
              />
            ))
          ) : fotos.length > 0 ? (
            fotos.map((foto) => (
              <ImageCard
                key={foto.public_id}
                foto={foto}
                onSelect={(f: CloudinaryPhoto) => setFotoSelecionada(f)}
                onDownload={handleDownload}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-sm font-medium uppercase tracking-widest">
                Nenhuma imagem encontrada em{" "}
                <span className="text-blue-500 font-bold">{categoria}</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-8 mt-20 mb-10">
          <button
            onClick={handlePrevPage}
            disabled={currentIndex === 0 || loading}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 disabled:opacity-10 transition-all"
          >
            ← Anterior
          </button>

          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-gray-200"></span>
            <span className="text-xs font-black text-gray-300">
              {currentIndex + 1}
            </span>
            <span className="h-px w-8 bg-gray-200"></span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!nextCursor || loading}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-blue-600 disabled:opacity-10 transition-all"
          >
            Próxima →
          </button>
        </div>
      </div>

      {fotoSelecionada && (
        <PhotoModal
          foto={fotoSelecionada}
          onClose={() => setFotoSelecionada(null)}
          onDownload={handleDownload}
        />
      )}

      <Footer />
    </div>
  );
}
