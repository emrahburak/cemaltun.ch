import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/about/webp/cem-altun-about-01.webp";

interface MobileAboutProps {
  active?: boolean;
}

const MobileAbout = ({ active }: MobileAboutProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Metnin tamamını gösteren perde durumu
  const [isExpanded, setIsExpanded] = useState(false);

  // --- 1. GİRİŞ ANİMASYONU ---
  useGSAP(() => {
    if (!containerRef.current) return;

    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current.fromTo(
      containerRef.current.querySelectorAll(".about-reveal"),
      { opacity: 0, y: 20, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, { scope: containerRef });

  // --- 2. PERDE (OVERLAY) ANİMASYONU ---
  useGSAP(() => {
    if (!overlayRef.current) return;

    if (isExpanded) {
      gsap.to(overlayRef.current, {
        y: 0,
        opacity: 1,
        visibility: "visible",
        duration: 0.6,
        ease: "expo.out"
      });
    } else {
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "expo.in"
      });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
      setIsExpanded(false); // Bölümden çıkınca perdeyi kapat
    }
  }, [active]);

  return (
    <section
      ref={containerRef}
      className="w-full h-full flex flex-col justify-center bg-[#f5f5f5] text-[#222] px-6 py-10 overflow-hidden"
    >
      <div className="flex flex-col gap-6 w-full">

        {/* BAŞLIK */}
        <h2 className="about-reveal text-[10px] font-urbanist font-bold tracking-[0.4em] uppercase opacity-40">
          {t("about.title")}
        </h2>

        {/* MOBİL GÖRSEL (Daha kompakt) */}
        <div className="about-reveal w-full h-48 overflow-hidden rounded-sm shadow-md">
          <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover" />
        </div>

        {/* KISA ÖZET (Excerpt) */}
        <div className="about-reveal">
          <p className="font-manrope text-[0.9rem] leading-relaxed opacity-90 line-clamp-6 italic">
            {t("about.content")}
          </p>

          {/* DEVAMINI OKU BUTONU */}
          <button
            onClick={() => setIsExpanded(true)}
            className="mt-4 flex items-center gap-3 group"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black/20 pb-1">
              {t("about.read_more") || "READ FULL STORY"}
            </span>
            <div className="w-6 h-[1px] bg-black/30 group-hover:w-10 transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* --- TAM EKRAN BİYOGRAFİ PERDESİ (OVERLAY) --- */}
      <div
        ref={overlayRef}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[100] bg-white px-8 py-20 invisible" // py-20 yaparak üstten alan açtık
        style={{ transform: "translateY(100%)" }}
      >
        {/* KAPAT BUTONU - SOL ÜST KÖŞEYE ALINDI */}
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute top-8 left-8 flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-full h-[1px] bg-black rotate-45 absolute"></div>
            <div className="w-full h-[1px] bg-black -rotate-45 absolute"></div>
          </div>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase italic">CLOSE</span>
        </button>

        {/* TAM METİN KONTEYNERI */}
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar pt-10">
          <h3 className="text-2xl font-urbanist font-light mb-8 italic opacity-20 tracking-tighter uppercase">
            {t("about.title")}
          </h3>
          <p className="font-manrope text-sm leading-[1.8] opacity-80 whitespace-pre-line pb-24 text-left">
            {t("about.content")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileAbout;
