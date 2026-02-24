import { useState } from "react";
import { Instagram, TreePalm, Search, LayoutGrid, List } from "lucide-react";
import { senorasData } from "./data/senoras";
import SenoraCard from "./components/SenoraCard";
import SenoraModal from "./components/SenoraModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSenora, setSelectedSenora] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const filteredSenoras = senorasData.filter(
    (s) =>
      s.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.realName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedSenoras = [...filteredSenoras].sort((a, b) =>
    a.nickname.localeCompare(b.nickname),
  );

  const handleLogoClick = () => {
    // Si quieres que el logo resetee todo y suba el scroll
    setSearchTerm("");
    const scrollContainer = document.querySelector("main");
    if (scrollContainer)
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-screen bg-[#1a0524] text-white font-['Montserrat'] antialiased overflow-hidden flex flex-col">
      {/* 1. NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex justify-between items-center z-[100] shadow-2xl">
        <span
          onClick={handleLogoClick}
          className="text-[#2d0a3d] font-[900] tracking-tighter text-lg uppercase cursor-pointer hover:opacity-70 transition-opacity"
        >
          SEÑORAPEDIA
        </span>

        <div className="flex gap-5 text-[#2d0a3d]">
          <a
            href="https://www.instagram.com/autenticassenoras"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007a] transition-colors flex items-center"
          >
            <Instagram size={20} strokeWidth={2.5} />
          </a>
          <a
            href="https://linktr.ee/senorasdelista"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007a] transition-colors flex items-center"
          >
            <TreePalm size={20} strokeWidth={2.5} />
          </a>
        </div>
      </nav>

      {/* 2. HEADER Y BUSCADOR FIJOS */}
      <div className="pt-28 flex-shrink-0 bg-[#1a0524] z-50">
        <header className="text-center mb-8 px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-[500] uppercase leading-[0.8] tracking-tighter">
            LA AUTÉNTICA <br />
            <span className="text-[#ff007a] text-3xl sm:text-5xl md:text-6xl font-[900]">
              Señorapedia
            </span>
          </h1>
        </header>

        <div className="flex items-center gap-3 mb-6 max-w-2xl mx-auto px-4">
          <div className="relative flex-grow group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff007a]"
              size={20}
            />
            <input
              type="text"
              placeholder="Busca por apodo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#ff007a] transition-all font-bold uppercase text-sm tracking-widest font-['Montserrat']"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#ff007a] transition-all"
          >
            {viewMode === "grid" ? (
              <List size={24} />
            ) : (
              <LayoutGrid size={24} />
            )}
          </button>
        </div>
      </div>

      {/* 3. ÁREA DE SCROLL CON MÁSCARA SMOOTH */}
      <div className="relative flex-grow overflow-hidden">
        <main
          className="h-full overflow-y-auto px-4" // Quitamos scrollbar-hide
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)",
          }}
        >
          <div className="w-full max-w-6xl mx-auto pt-4 pb-60">
            {" "}
            {/* pb-60 para que el fade no corte la última */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-8 pt-10">
                {filteredSenoras.map((senora) => (
                  <div
                    key={`grid-${senora.id}`}
                    className="flex justify-center"
                  >
                    <SenoraCard
                      senora={senora}
                      onClick={() => setSelectedSenora(senora)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto pt-4">
                <div className="flex justify-between items-center mb-6 px-4 border-b border-white/10 pb-4">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
                    Directorio{" "}
                    <span className="text-white/20 font-medium">Completo</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#ff007a]/60">
                      {sortedSenoras.length}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  {sortedSenoras.map((senora) => (
                    <div
                      key={`list-${senora.id}`}
                      onClick={() => setSelectedSenora(senora)}
                      className="group flex justify-between items-center py-4 border-b border-white/[0.03] cursor-pointer hover:bg-white/[0.02] px-4 transition-all"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-[9px] font-black text-white/10 w-4">
                          {senora.nickname.charAt(0)}
                        </span>
                        <span className="text-lg font-bold uppercase tracking-tighter text-white/80 group-hover:text-[#ff007a] transition-colors">
                          {senora.nickname}
                        </span>
                      </div>
                      <span className="text-[9px] font-medium uppercase tracking-widest text-white/10 group-hover:text-white/30 transition-colors">
                        {senora.realName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <SenoraModal
        senora={selectedSenora}
        isOpen={!!selectedSenora}
        onClose={() => setSelectedSenora(null)}
      />
    </div>
  );
}

export default App;
