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
  "all",
  "açai",
  "alimentos",
  "animais",
  "automovel",
  "backgrounds",
  "batata",
  "bebidas",
  "casal-familia",
  "celebridade",
  "cerveja",
  "cocacola",
  "crianças",
  "doces",
  "esporte",
  "fantasia",
  "fitness",
  "flor",
  "frango",
  "frutas e legumes",
  "hamburguer",
  "hot-dog",
  "celular",
  "natal",
  "natureza",
  "negócios",
  "pepsi",
  "pessoas",
  "pizzas",
  "roupas",
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
    // 1. Remove otimizações de visualização para pegar o arquivo real
    // 2. Converte a extensão para .png via URL do Cloudinary
    // 3. Adiciona fl_attachment para forçar o download direto
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

      {/* Navegação de Categorias */}
      <div className="flex gap-2 overflow-x-auto pb-6 mb-8 scrollbar-hide">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-5 py-2 rounded-full capitalize whitespace-nowrap text-sm font-medium transition-all ${
              categoria === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Imagens */}
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
              className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 md:h-56 w-full">
                <Image
                  src={foto.secure_url}
                  alt={foto.filename || "Recurso"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleDownload(foto.secure_url)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 rounded-lg text-xs md:text-sm transition-colors uppercase tracking-wider"
                >
                  Download PNG
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
            Nenhuma imagem encontrada nesta pasta.
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

      <Footer />
    </div>
  );
}
