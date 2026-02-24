import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SenoraCard = ({ senora, onClick }) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isInView = useInView(ref, { amount: 0.8 });
  const activeTrigger = isMobile && isInView;

  // Lógica de velocidad: 700ms en móvil para suavidad, 300ms en PC para reactividad
  const transitionSpeed = isMobile ? "duration-1000" : "duration-300";

  return (
    <article
      ref={ref}
      onClick={onClick}
      className={`group relative w-full max-w-[300px] bg-[#2d0a3d] rounded-[30px] pb-[25px] cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.4)]
                 transition-all ${transitionSpeed} ease-out 
                 ${activeTrigger ? "translate-y-[-10px]" : ""} 
                 hover:translate-y-[-10px]`}
    >
      <div
        className={`relative h-[170px] mt-[60px] rounded-[30px] 
                    bg-gradient-to-b from-[#4e1d6b] to-[#2d0a3d] 
                    bg-origin-border
                    border-[3px] transition-all ${transitionSpeed} ease-out
                    ${activeTrigger ? "border-[#ff007a] shadow-[0_10px_30px_rgba(255,0,122,0.4)]" : "border-transparent"}
                    group-hover:border-[#ff007a] group-hover:shadow-[0_10px_30px_rgba(255,0,122,0.4)]
                    overflow-visible`}
      >
        <img
          src={senora.img}
          alt={senora.nickname}
          className={`absolute bottom-0 left-1/2 -translate-x-1/2
                     w-[220px] h-auto
                     object-contain
                     z-[5] pointer-events-none
                     transition-transform ${transitionSpeed} ease-out
                     ${activeTrigger ? "scale-[1.10]" : ""}
                     group-hover:scale-[1.05]`}
          style={{
            transformOrigin: "bottom",
            marginBottom: "-1px",
          }}
        />

        <div className="absolute -bottom-[12px] right-[15px] bg-[#ff007a] px-[14px] py-[6px] rounded-[30px] text-[0.7rem] font-[900] z-10 uppercase text-white shadow-lg">
          {senora.category}
        </div>
      </div>

      <div className="pt-[30px] px-[15px] pb-[5px] text-center">
        <h2
          className={`text-[1.4rem] font-[900] uppercase mb-[4px] leading-tight text-white transition-colors ${transitionSpeed}
                       ${activeTrigger ? "text-[#ff007a]" : ""}
                       group-hover:text-[#ff007a]`}
        >
          {senora.nickname}
        </h2>
        <div className="text-[0.8rem] text-white/50 font-medium">
          {senora.realName}
        </div>
      </div>
    </article>
  );
};

export default SenoraCard;
