import Image from "next/image";

interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename?: string;
}

interface ImageCardProps {
  foto: CloudinaryPhoto;
  onSelect: (foto: CloudinaryPhoto) => void;
  onDownload: (url: string) => void;
}

export function ImageCard({ foto, onSelect, onDownload }: ImageCardProps) {
  return (
    <div className="group bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300">
      <div
        className="relative h-56 cursor-zoom-in overflow-hidden"
        onClick={() => onSelect(foto)}
      >
        <Image
          src={foto.secure_url}
          alt={foto.filename || "Recurso"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <button
          onClick={() => onDownload(foto.secure_url)}
          className="w-full py-2 bg-zinc-800 hover:bg-blue-600 text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
