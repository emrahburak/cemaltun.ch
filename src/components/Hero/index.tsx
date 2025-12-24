import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-09.webp";

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setIsRevealed(true)
    });

    // 1. ADIM: SPEKTRUM ÇİZGİSİ (BEYAZ EKRANDA BAŞLAR)
    tl.to(spectrumRef.current, {
      width: "100%",
      duration: 2.2,
      ease: "power4.inOut"
    });

    // Beyaz örtü ve çizgi yavaşça çekilirken fotoğraf "banyo" edilmeye başlar
    tl.to(spectrumRef.current, { opacity: 0, duration: 1 });
    tl.to(overlayRef.current, { opacity: 0, duration: 2.5, ease: "power2.inOut" }, "-=0.5");

    // 2. ADIM: DARKROOM REVEAL (FOTOĞRAF SABİT - SİS EFEKTİ)
    tl.fromTo(imageWrapperRef.current,
      {
        opacity: 0,
        filter: "blur(40px) brightness(0.4)", // Başlangıçta çok bulanık ve loş
        WebkitMaskImage: "radial-gradient(circle, black 0%, transparent 20%)",
        maskImage: "radial-gradient(circle, black 0%, transparent 20%)",
        WebkitMaskSize: "300% 300%",
        maskSize: "300% 300%",
        WebkitMaskPosition: "center",
        maskPosition: "center"
      },
      {
        opacity: 1,
        filter: "blur(0px) brightness(1)", // Netleşir ve orijinal ışığına kavuşur
        WebkitMaskImage: "radial-gradient(circle, black 100%, transparent 100%)",
        maskImage: "radial-gradient(circle, black 100%, transparent 100%)",
        duration: 4.5,
        ease: "power2.inOut",
      }, "-=2.2"
    );

    // 3. ADIM: YAZILARIN SİSİN İÇİNDEN BELİRMESİ
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 20, filter: "blur(15px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "expo.out" },
      "-=1.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">

      {/* BAŞLANGIÇ BEYAZLIĞI */}
      <div ref={overlayRef} className="absolute inset-0 z-[60] bg-[#f5f5f5]" />

      {/* SPEKTRUM ÇİZGİSİ */}
      <div className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center px-10 md:px-40">
        <div
          ref={spectrumRef}
          className="h-[1px] bg-black/50 w-0 origin-center"
        />
      </div>

      {/* SABİT GÖRSEL (Filtresiz Orijinal Siyah Beyaz) */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <img
          src={defaultImage}
          alt="Cem Altun"
          className="w-full h-full object-cover"
        />
        {/* Yazı okunabilirliği için yumuşak karartma */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-[3000ms] ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* CINEMATIC CONTENT */}
      <div ref={contentRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white pointer-events-none">
        <div className="space-y-6 md:space-y-8 px-4">
          <p className="font-manrope text-[10px] md:text-xs tracking-[0.8em] uppercase opacity-40">
            {t('hero.official_website')}
          </p>
          <h1 className="font-urbanist text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase">
            CEM ALTUN
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-8 font-urbanist text-[10px] md:text-sm tracking-[0.5em] uppercase opacity-60 font-semibold">
            <span>{t('hero.composer')}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span>{t('hero.zurich')}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
};

export default Hero;
