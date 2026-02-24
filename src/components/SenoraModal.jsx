import { motion, AnimatePresence } from "framer-motion";
import { senorasData } from "../data/senoras"; // Importamos los datos para comparar

const SenoraModal = ({ senora, isOpen, onClose }) => {
  if (!isOpen || !senora) return null;

  // LÓGICA DE MAPEO DINÁMICO:
  // Buscamos todos los nicknames de otras fichas que tengan el mismo realName
  const otherNicknames = senorasData
    .filter(
      (s) => s.realName === senora.realName && s.nickname !== senora.nickname,
    )
    .map((s) => s.nickname);

  // Combinamos sus propios aliases con los nicknames de sus otras versiones
  const allAliases = [
    ...new Set([...(senora.aliases || []), ...otherNicknames]),
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[3000] p-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1a0524ef] backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative bg-[#2d0a3d] w-full max-w-[500px] rounded-[40px] p-10 border-2 border-[#ff007a] shadow-[0_0_60px_rgba(255,0,122,0.3)] z-10"
        >
          {/* Imagen con el margen para que sobresalga bien */}
          <div className="relative h-[140px] bg-[#4e1d6b] rounded-[20px] mb-16 mt-12">
            <img
              src={senora.img}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto max-w-[250px] h-auto max-h-[220px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              alt={senora.nickname}
            />
          </div>

          <h2 className="text-3xl font-black uppercase text-[#ff007a] text-center leading-none mb-1">
            {senora.nickname}
          </h2>
          <span className="text-white/60 block text-center mb-6">
            {senora.realName}
          </span>

          <div className="mb-6">
            <h3 className="text-[10px] uppercase tracking-widest font-black text-[#ff007a] mb-3 text-left">
              Otros Apodos e Identidades
            </h3>
            <ul className="flex flex-wrap gap-2 justify-start">
              {allAliases.map((alias, index) => (
                <li
                  key={index}
                  className="bg-white/10 px-3 py-1 rounded-full text-xs text-white"
                >
                  {alias}
                </li>
              ))}
              {allAliases.length === 0 && (
                <li className="text-white/30 text-xs italic">
                  No tiene otros apodos conocidos
                </li>
              )}
            </ul>
          </div>

          <div className="mb-8 text-left">
            <h3 className="text-[10px] uppercase tracking-widest font-black text-[#ff007a] mb-3">
              Descripción
            </h3>
            <p className="text-sm text-white/80 leading-relaxed italic">
              "{senora.desc}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="float-right bg-[#ff007a] text-white px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
          >
            Cerrar
          </button>
          <div className="clear-both"></div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SenoraModal;
