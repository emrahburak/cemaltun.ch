import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/about/webp/cem-altun-about-01.webp";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      ".about-reveal",
      { opacity: 0, y: 20, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      // Mobilde min-h-screen (taşma koruması), masaüstünde tam h-screen
      className="w-full min-h-screen md:h-screen flex items-center justify-center bg-[#f5f5f5] text-[#222] px-6 md:px-20 lg:px-32 pt-20 md:pt-24 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-28 items-stretch h-full md:h-auto">

        {/* 1. ÜST/SOL TARAF: BAŞLIK VE FOTOĞRAF (Mobilde Yan Yana veya Alt Alta) */}
        <div className="flex flex-col justify-center gap-6 md:gap-0 h-full">

          {/* Mobil Başlık (Her zaman en üstte) */}
          <h2 className="about-reveal text-[10px] md:text-sm font-urbanist font-bold tracking-[0.4em] uppercase opacity-40 mb-2 md:mb-5">
            {t("about.title")}
          </h2>

          {/* MOBİL İÇİN FOTOĞRAF (Sadece mobilde görünür, yer kaplamasın diye boyu kısıtlı) */}
          <div className="about-reveal block md:hidden w-full h-40 overflow-hidden shadow-lg border border-black/5">
            <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover" />
          </div>

          {/* İÇERİK METNİ */}
          <div className="about-reveal overflow-y-auto md:overflow-visible pr-2 md:pr-0">
            <p className="font-manrope text-[0.85rem] sm:text-base md:text-[0.95rem] lg:text-[1.05rem] leading-relaxed opacity-90 whitespace-pre-line max-w-prose">
              {t("about.content")}
            </p>
          </div>
        </div>

        {/* 2. SAĞ TARAF: MASAÜSTÜ FOTOĞRAF (Sadece md ve üzeri ekranlarda) */}
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

export default About;
