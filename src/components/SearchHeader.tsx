import { CATEGORIAS } from "./../app/constants/categorias";

interface SearchHeaderProps {
  categoria: string;
  setCategoria: (cat: string) => void;
  currentIndex: number;
}

export function SearchHeader({
  categoria,
  setCategoria,
  currentIndex,
}: SearchHeaderProps) {
  return (
    <div className="mb-12 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter italic">
          Banco de Imagens
        </h1>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
          Página {currentIndex + 1} —{" "}
          <span className="text-blue-500">{categoria}</span>
        </p>
      </header>

      <div className="max-w-md mx-auto relative group">
        <input
          type="text"
          list="categorias-list"
          placeholder="Pesquisar categoria..."
          className="w-full px-6 py-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-zinc-600"
          value={categoria === "all" ? "" : categoria}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategoria(e.target.value.toLowerCase() || "all")
          }
        />
        <datalist id="categorias-list">
          {CATEGORIAS.map((cat: string) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
