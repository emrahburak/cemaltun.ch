import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-09.webp";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setIsRevealed(true)
    });

    // 1. ADIM: SES SPEKTRUMU (LOADING LINE)
    // Çizgi doluyor
    tl.to(spectrumRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut"
    });

    // 2. ADIM: SPEKTRUM BİTERKEN GÖRSELİ MERKEZDEN PATLAT
    // Çizgiyi gizle
    tl.to(spectrumRef.current, { opacity: 0, duration: 0.8 });

    // TELESCOPE REVEAL: Tam merkezden büyüme
    tl.fromTo(imageWrapperRef.current,
      {
        width: "0px",
        height: "0px",
        opacity: 0,
        borderRadius: "50%",
        // MERKEZDE TUTMAK İÇİN KRİTİK:
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%"
      },
      {
        width: "100%",
        height: "100%",
        opacity: 1,
        borderRadius: "0px",
        ease: "expo.out",
        duration: 4.7
      }, "-=0.5");

    // 3. ADIM: CINEMATIC INTRO YAZILARI
    tl.fromTo(".cinematic-content",
      { opacity: 0, y: 30, filter: "blur(15px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden">

      {/* 1. KATMAN: SES SPEKTRUMU (Tam Merkezde Çizgi) */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center px-20 md:px-40">
        <div
          ref={spectrumRef}
          className="h-[1px] bg-black/60 w-0 origin-left"
        />
      </div>

      {/* 2. KATMAN: MERKEZDEN BÜYÜYEN GÖRSEL (Telescope) */}
      {/* Not: 'transform' değerlerini GSAP içinden yönettiğimiz için burada sadece ana pozisyonu veriyoruz */}
      <div
        ref={imageWrapperRef}
        className="hero-image-wrapper absolute z-10 overflow-hidden shadow-2xl"
      >
        <img
          src={defaultImage}
          alt="Cem Altun"
          className="w-full h-full object-cover scale-105"
        />
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* 3. KATMAN: CINEMATIC INTRO */}
      <div className="cinematic-content absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white">
        <div className="space-y-6 md:space-y-10 px-4">
          <p className="font-manrope text-[10px] md:text-xs tracking-[0.7em] uppercase opacity-60">
            Official Website
          </p>
          <h1 className="font-urbanist text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            CEM ALTUN
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-8 font-manrope text-[10px] md:text-sm tracking-[0.4em] uppercase opacity-80 font-semibold">
            <span>Composer</span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span>Zürich</span>
          </div>
        </div>
      </div>

      {/* Scroll İpucu */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>

    </section>
  );
};

export default Hero;
