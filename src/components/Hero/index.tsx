import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-10.webp";

// Yeni Bileşenler
import HeroLoader from "../HeroLoader";
import HeroContent from "../HeroContent";
import { useTranslation } from "react-i18next";

import "./style.css"
import RevisedText from "../RevisedText";

interface HeroProps {
  active?: boolean;
}

const Hero = ({ active }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation()

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Loader'ın bir kez çalışması için
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const staggerVal = 0.1; // Değeri buradan değiştirince her yer güncellenecek

  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setHasLoaded(true);
        // onComplete artık sadece durumu mühürler
      }
    });

    // --- 1. ADIM: LOADER ---
    tl.to(spectrumRef.current, { width: "100%", duration: 2.0, ease: "power4.inOut" });
    tl.to(spectrumRef.current, { opacity: 0, duration: 0.3 });

    // --- 2. ADIM: SHUTTER REVEAL ---
    tl.to(".shutter-top, .shutter-bottom", {
      scaleY: 0,
      duration: 2.2,
      ease: "sine.inOut",
      onStart: () => {
        setHasLoaded(true);
        setIsRevealed(true);
      }
    }, "<");

    tl.fromTo(imageWrapperRef.current,
      { filter: "blur(30px) scale(1.05)" },
      { filter: "blur(0px) scale(1)", duration: 2.5, ease: "power2.out" },
      "<"
    );

    // --- 3. ADIM: İÇERİK (HARFLER) ---
    tl.set(contentRef.current, { opacity: 1 }, "-=1.0");

    tl.fromTo(".char",
      { opacity: 0, y: 30, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.5, stagger: staggerVal, ease: "power3.out" },
      "-=1.5" // Perdeler açılırken harfler başlasın
    );

    // --- KRİTİK DOKUNUŞ: LIGHT BEAM BURADA GİRMELİ ---
    tl.fromTo("#light-beam",
      { x: "-150%", opacity: 0 },
      { x: "150%", opacity: 1, duration: 2.5, ease: "power2.inOut" },
      "-=1.8" // Harfler yükselirken ışık süzülerek geçsin (Çok daha sinematik!)
    );

    // GÖLGELER VE FİNAL
    tl.fromTo(".char-shadow",
      { opacity: 0, scaleX: 0.5, skewX: -20 },
      { opacity: 0.4, scaleX: 1.2, skewX: -55, duration: 1.8, stagger: staggerVal, ease: "power2.out" },
      "-=2.0"
    );

    tl.to(".char", {
      filter: "drop-shadow(10px 5px 8px rgba(0, 0, 0, 0.5))",
      duration: 1.2,
      stagger: staggerVal,
      ease: "sine.out"
    }, "-=1.0");

    tlRef.current = tl;
  }, { scope: containerRef });

  // --- TEKRARLAYAN IŞIK FONKSİYONU ---
  const triggerLightBeam = () => {
    // Timeline'dan bağımsız, hızlı bir ışık geçişi
    gsap.fromTo("#light-beam",
      { x: "-150%", opacity: 0 },
      { x: "150%", opacity: 1, duration: 2.0, ease: "power2.inOut" }
    );
  };

  useEffect(() => {
    if (hasLoaded && active) {
      // Hero'ya her geri gelişte ışık şovunu yap
      triggerLightBeam();

      // İçeriği de canlandır
      gsap.to(contentRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 });
    }
  }, [active, hasLoaded]);


  return (
    <section ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">

      {/* Loader sadece site ilk açıldığında görünür */}
      {!hasLoaded && <HeroLoader ref={overlayRef} spectrumRef={spectrumRef} />}

      {/* 1. ARKA PLAN KATMANI (Görsel) */}
      <div ref={imageWrapperRef} className="absolute inset-0 z-10 overflow-hidden bg-white">
        {/* BEYAZ GÖZ KAPAKLARI (Perdeler) */}
        <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
          <div className="shutter-top absolute top-0 left-0 w-full h-1/2 bg-white origin-top" />
          <div className="shutter-bottom absolute bottom-0 left-0 w-full h-1/2 bg-white origin-bottom" />
        </div>
        <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover grayscale-[50%]" />

        {/* LENS SWEEP EFECT */}
        <div
          id="light-beam"
          className="absolute inset-0 z-20 opacity-0 pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
            transform: "translateX(-100%) skewX(-20deg) scale(1.5)",
            filter: "blur(40px)"
          }}
        />

        {/* Cinematic Dark Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-[3000ms] ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* 2. İÇERİK KATMANI (HeroContent) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <HeroContent />
        </div>
      </div>

      {/* 3. SCROLL HINT (Yeni Hareketli Yapı) */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 flex flex-col items-center gap-4 ${isRevealed && active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        {/* Çeviriden gelen metin: Küçük, İtalik ve Zarif */}
        <span className="font-sollarish text-[0.9em] uppercase tracking-[0.4em] text-white/70 font-semibold animate-pulse select-none">
          {t("hero.scrollHint")}
        </span>

        {/* Hareketli Çizgi */}
        <div className="w-[1.5px] h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/60 to-transparent animate-scroll-line" />
        </div>
      </div>
      {/* 4. CONTACT EMAIL (Left Bottom - As requested by client) */}
      {/* 4. CONTACT EMAIL */}
      <div
        className={`absolute bottom-10 left-6 md:left-12 z-40 transition-all duration-1000 mix-blend-difference hidden md:block ${isRevealed && active ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
      >
        <RevisedText
          text="info@cemaltun.ch"
          as="a"
          href="mailto:info@cemaltun.ch"
          hoverUnderline
          className="font-manrope text-xs font-bold tracking-[0.3em] uppercase text-white"
        />
      </div>

    </section>
  );
}

export default Hero;
