import Image from "next/image";

interface CloudinaryPhoto {
  public_id: string;
  secure_url: string;
  filename?: string;
}

interface PhotoModalProps {
  foto: CloudinaryPhoto;
  onClose: () => void;
  onDownload: (url: string) => void;
}

export function PhotoModal({ foto, onClose, onDownload }: PhotoModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org"
          width="24"
          height="24"
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
        className="relative max-w-5xl w-full flex flex-col items-center gap-6"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video max-h-[75vh] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
          <Image
            src={foto.secure_url.replace("/f_auto,q_auto/", "/")}
            alt="Preview"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => onDownload(foto.secure_url)}
            className="bg-blue-600 text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-900/20"
          >
            Baixar PNG em Alta
          </button>
          <button
            onClick={onClose}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest underline underline-offset-8"
          >
            Voltar para galeria
          </button>
        </div>
      </div>
    </div>
  );
}
