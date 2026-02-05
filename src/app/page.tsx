"use client";
import { useState, useEffect } from "react";
import { SearchHeader } from "../components/SearchHeader";
import { ImageCard } from "../components/ImageCard";
import { PhotoModal } from "../components/PhotoModal";

interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename?: string;
}

export default function GaleriaAlunos() {
  const [fotos, setFotos] = useState<CloudinaryPhoto[]>([]);
  const [categoria, setCategoria] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [fotoSelecionada, setFotoSelecionada] =
    useState<CloudinaryPhoto | null>(null);

  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const carregarImagens = async (cursor: string | null = null) => {
    setLoading(true);
    try {
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
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCursorHistory([]);
    setCurrentIndex(0);
    carregarImagens(null);
  }, [categoria]);

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
      setCursorHistory((prev) => prev.slice(0, -1));
      setCurrentIndex((prev) => prev - 1);
      carregarImagens(prevCursor);
    }
  };

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
    /* CORREÇÃO AQUI: Mudado de bg-white para bg-[#18181b] */
    <div className="min-h-screen bg-[#18181b] text-white flex flex-col font-sans">
      <div className="max-w-7xl mx-auto p-4 sm:p-8 w-full flex-grow">
        <SearchHeader
          categoria={categoria}
          setCategoria={setCategoria}
          currentIndex={currentIndex}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[450px]">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              /* CORREÇÃO: Skeleton agora é escuro */
              <div
                key={`skeleton-${i}`}
                className="animate-pulse bg-zinc-800/50 h-64 rounded-xl shadow-inner"
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
            <div className="col-span-full text-center py-32 text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl">
              Nenhuma imagem encontrada em{" "}
              <span className="font-bold text-blue-500 uppercase tracking-tighter">
                {categoria}
              </span>
              .
            </div>
          )}
        </div>

        {/* PAGINAÇÃO: Cores ajustadas para o Dark Mode */}
        <div className="flex justify-center items-center gap-8 mt-20 mb-10">
          <button
            onClick={handlePrevPage}
            disabled={currentIndex === 0 || loading}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white disabled:opacity-20 transition-all"
          >
            ← Voltar
          </button>
          <span className="text-[10px] font-black bg-zinc-900 px-3 py-1 rounded text-zinc-400 border border-zinc-800">
            {currentIndex + 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!nextCursor || loading}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-white disabled:opacity-20 transition-all"
          >
            Avançar →
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
    </div>
  );
}
