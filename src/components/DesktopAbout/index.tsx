import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/about/webp/cem-altun-about-01.webp";
import RevisedText from "../RevisedText";

// Stacked (Fullscreen) yapı için prop tanımı
interface AboutProps {
  active?: boolean;
}

const DesktopAbout = ({ active }: AboutProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // --- 1. ANİMASYON TANIMI (BLOK BAZLI) ---
  useGSAP(() => {
    if (!containerRef.current) return;

    // Timeline'ı oluşturuyoruz (duraklatılmış)
    // Sadece .about-reveal sınıfına sahip blokları hedefler
    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current.fromTo(
      containerRef.current.querySelectorAll(".about-reveal"),
      {
        opacity: 0,
        y: 30,
        filter: "blur(10px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15, // Bloklar arası asil bir gecikme
        ease: "power3.out",
        clearProps: "filter" // Performans için temizlik
      }
    );
  }, { scope: containerRef });

  // --- 2. TETİKLEME (Home.tsx'den gelen sinyal) ---
  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [active]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-[#f5f5f5] text-[#222] px-6 md:px-20 lg:px-32 py-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-28 items-center h-full">

        {/* SOL TARAF: BAŞLIK VE İÇERİK */}
        <div className="flex flex-col justify-center gap-6">

          <h2 className="about-reveal text-[10px] md:text-sm font-urbanist font-bold tracking-[0.4em] uppercase opacity-40">
            {t("about.title")}
          </h2>
          {/* 2. Mobil Görsel Reveal (Sadece Mobilde) */}
          <div className="about-reveal block md:hidden w-full h-48 overflow-hidden shadow-lg border border-black/5">
            <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover" />
          </div>

          {/* 3. İçerik Metni Reveal (Blok olarak gelir) */}
          <div className="about-reveal pr-2 md:pr-0">
            <p className="font-manrope text-[0.85rem] sm:text-base md:text-[0.95rem] lg:text-[1.05rem] leading-relaxed opacity-90 whitespace-pre-line max-w-prose">
              {t("about.content")}
            </p>
          </div>
        </div>

        {/* 4. Sağ Taraf Görsel Reveal (Masaüstü) */}
        <div className="about-reveal hidden md:flex justify-end items-center">
          <div className="relative w-full h-full max-h-[70vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <img
              src={defaultImage}
              alt="Cem Altun"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesktopAbout;
