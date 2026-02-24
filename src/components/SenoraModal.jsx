import { motion, AnimatePresence } from "framer-motion";
import { senorasData } from "../data/senoras";

const SenoraModal = ({ senora, isOpen, onClose }) => {
  if (!isOpen || !senora) return null;

  const otherNicknames = senorasData
    .filter(
      (s) => s.realName === senora.realName && s.nickname !== senora.nickname,
    )
    .map((s) => s.nickname);

  const allAliases = [
    ...new Set([...(senora.aliases || []), ...otherNicknames]),
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[3000] p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1a0524ef] backdrop-blur-md"
        />

        {/* Modal Main Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-[#2d0a3d] w-full max-w-[450px] max-h-[85vh] 
                     rounded-[40px] border-2 border-[#ff007a] 
                     shadow-[0_0_60px_rgba(255,0,122,0.3)] z-10 
                     font-['Montserrat'] overflow-hidden flex flex-col"
        >
          {/* 1. PARTE FIJA: Imagen y Nombres */}
          <div className="p-6 md:p-10 pb-2 flex-shrink-0">
            {/* Contenedor del rectángulo lila con margen superior para dejar espacio a la cabeza */}
            <div className="relative h-[140px] w-full bg-[#4e1d6b] rounded-[25px] mb-8 mt-10 flex items-center justify-center overflow-visible">
              <img
                src={senora.img}
                className="absolute -top-10 w-full h-[180px] object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                alt={senora.nickname}
              />
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-[900] uppercase text-[#ff007a] leading-tight tracking-tighter">
                {senora.nickname}
              </h2>
              <span className="text-white/40 block text-xs font-bold tracking-[0.2em] uppercase mt-1">
                {senora.realName}
              </span>
            </div>
          </div>

          {/* 2. PARTE CON SCROLL: Apodos y Descripción */}
          <div
            className="flex-grow overflow-y-auto px-6 md:px-10"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="space-y-6 py-4">
              {allAliases.length > 0 && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-[900] text-[#ff007a] mb-3 opacity-80">
                    Otros Apodos e Identidades
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {allAliases.map((alias, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/90 font-bold italic"
                      >
                        {alias}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-[900] text-[#ff007a] mb-2 opacity-80">
                  Descripción
                </h3>
                <p className="text-sm text-white/80 leading-relaxed italic font-medium">
                  "{senora.desc}"
                </p>
              </div>
            </div>
          </div>

          {/* 3. PARTE FIJA: Botón inferior */}
          <div className="p-6 md:p-10 pt-2 flex-shrink-0 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#ff007a] text-white px-8 py-3 rounded-full font-[900] uppercase text-[10px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SenoraModal;
