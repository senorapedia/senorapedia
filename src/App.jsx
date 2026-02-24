import { useState, useEffect } from "react";
import { Instagram, TreePalm, Search } from "lucide-react"; // Cambiamos iconos
import { senorasData } from "./data/senoras";
import SenoraCard from "./components/SenoraCard";
import SenoraModal from "./components/SenoraModal";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSenora, setSelectedSenora] = useState(null);

  const filteredSenoras = senorasData.filter(
    (s) =>
      s.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.realName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#1a0524] text-white font-['Montserrat'] antialiased overflow-x-hidden">
      {/* NAVBAR MODIFICADO */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl bg-white/95 backdrop-blur-md px-6 py-3 rounded-full flex justify-between items-center z-50 shadow-2xl">
        <span className="text-[#2d0a3d] font-[900] tracking-tighter text-lg uppercase">
          SEÑORAPEDIA
        </span>

        <div className="flex gap-5 text-[#2d0a3d]">
          <a
            href="https://www.instagram.com/autenticassenoras"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007a] transition-colors"
          >
            <Instagram size={20} strokeWidth={2.5} />
          </a>
          <a
            href="https://linktr.ee/senorasdelista"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff007a] transition-colors"
          >
            {/* Usamos ExternalLink como icono para Linktree */}
            <TreePalm size={20} strokeWidth={2.5} />
          </a>
        </div>
      </nav>

      <main className="w-full max-w-6xl mx-auto pt-32 px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-[500] uppercase leading-[0.8] mb-4 tracking-tighter">
            LA AUTÉNTICA <br />
            <span className="text-[#ff007a] text-4xl sm:text-6xl md:text-8xl font-[900] tracking-normal">
              Señorapedia
            </span>
          </h1>
        </header>

        <div className="flex flex-col sm:flex-row gap-3 mb-24 max-w-2xl mx-auto">
          <div className="relative flex-grow group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#ff007a] transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Busca por apodo o nombre real..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 outline-none focus:border-[#ff007a] focus:bg-white/10 transition-all font-bold placeholder:text-white/20 uppercase text-sm tracking-widest"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-8 pb-32">
          {filteredSenoras.map((senora) => (
            <div key={`senora-${senora.id}`} className="flex justify-center">
              <SenoraCard
                senora={senora}
                onClick={() => setSelectedSenora(senora)}
              />
            </div>
          ))}
        </div>
      </main>

      <SenoraModal
        senora={selectedSenora}
        isOpen={!!selectedSenora}
        onClose={() => setSelectedSenora(null)}
      />
    </div>
  );
}

export default App;
