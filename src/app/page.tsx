"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";

interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename: string;
}

const CATEGORIAS = [
  "açai",
  "agua",
  "alimentos",
  "all",
  "animais",
  "automovel",
  "backgrounds",
  "batata",
  "bebidas",
  "binóculos",
  "casal-familia",
  "celebridade",
  "celular",
  "cerveja",
  "cocacola",
  "colete",
  "crianças",
  "doces",
  "esporte",
  "explosão",
  "fitness",
  "flor",
  "fogo",
  "folhas",
  "frango",
  "frutas e legumes",
  "grama",
  "hamburguer",
  "hot-dog",
  "lua",
  "monstro",
  "munição",
  "natal",
  "natureza",
  "negócios",
  "nuvem",
  "ouro",
  "pepsi",
  "pessoas",
  "pizzas",
  "roupas",
  "sol",
  "sorvete",
  "sprite",
  "suco",
  "vegetal",
  "vinho",
];

export default function GaleriaAlunos() {
  const [fotos, setFotos] = useState<CloudinaryPhoto[]>([]);
  const [categoria, setCategoria] = useState("all");
  const [loading, setLoading] = useState(true);
  const [fotoSelecionada, setFotoSelecionada] =
    useState<CloudinaryPhoto | null>(null);

  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const carregarImagens = async (cursor: string | null = null) => {
    setLoading(true);
    try {
      const baseUrl = `/api/photos?tag=${categoria}`;
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

  useEffect(() => {
    setCursorHistory([]);
    setCurrentIndex(0);
    carregarImagens(null);
  }, [categoria]);

  // Bloquear scroll do fundo quando o modal abrir
  useEffect(() => {
    if (fotoSelecionada) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [fotoSelecionada]);

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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
          Banco de Imagens
        </h1>
        <p className="text-gray-500 text-sm">Página {currentIndex + 1}</p>
      </header>

      {/* Categorias */}
      <div className="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-5 py-2 rounded-full capitalize whitespace-nowrap text-sm font-medium transition-all ${
              categoria === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[450px]">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 h-64 rounded-xl"
            />
          ))
        ) : fotos.length > 0 ? (
          fotos.map((foto) => (
            <div
              key={foto.public_id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all"
            >
              <div
                className="relative h-48 md:h-56 w-full cursor-zoom-in overflow-hidden"
                onClick={() => setFotoSelecionada(foto)}
              >
                <Image
                  src={foto.secure_url}
                  alt={foto.filename || "Recurso"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleDownload(foto.secure_url)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs md:text-sm uppercase tracking-wider transition-colors"
                >
                  Download PNG
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
            Nenhuma imagem encontrada.
          </div>
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center gap-6 mt-16 mb-20">
        <button
          onClick={handlePrevPage}
          disabled={currentIndex === 0 || loading}
          className="px-6 py-2 rounded-lg font-bold border border-gray-300 text-gray-600 disabled:opacity-20 hover:bg-gray-50 transition-all"
        >
          ← Anterior
        </button>
        <span className="text-sm font-bold text-gray-400">
          {currentIndex + 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!nextCursor || loading}
          className="px-6 py-2 rounded-lg font-bold bg-slate-900 text-white disabled:bg-gray-200 hover:bg-blue-600 transition-all shadow-sm"
        >
          Próxima →
        </button>
      </div>

      {/* MODAL DE PREVIEW */}
      {fotoSelecionada && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setFotoSelecionada(null)}
        >
          <button className="absolute top-5 right-5 text-white hover:text-blue-400 transition-colors">
            <svg
              xmlns="http://www.w3.org"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()} // Impede fechar ao clicar na imagem
          >
            <div className="relative w-full h-full">
              <Image
                src={fotoSelecionada.secure_url.replace("/f_auto,q_auto/", "/")}
                alt="Preview"
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>

            <button
              onClick={() => handleDownload(fotoSelecionada.secure_url)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all hover:scale-105"
            >
              Baixar Versão PNG
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
