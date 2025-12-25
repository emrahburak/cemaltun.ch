import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-09.webp";

// Yeni Bileşenler
import HeroLoader from "../HeroLoader";
import HeroContent from "../HeroContent";

interface HeroProps {
  active?: boolean;
}

const Hero = ({ active }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // Loader'ın bir kez çalışması için
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // --- 1. İLK AÇILIŞ ANİMASYONU (LOADER + REVEAL) ---
  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsRevealed(true);
        setHasLoaded(true);
      }
    });

    // 1. ADIM: LOADER ANIMASYONU (Spectrum)
    tl.to(spectrumRef.current, {
      width: "100%",
      duration: 2.0,
      ease: "power4.inOut"
    });

    tl.to(spectrumRef.current, { opacity: 0, duration: 0.4 });

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=0.2");

    // 2. ADIM: IMAGE REVEAL (Radial Mask & Blur)
    tl.fromTo(imageWrapperRef.current,
      {
        opacity: 0,
        filter: "blur(40px) brightness(2) contrast(0.5)",
        WebkitMaskImage: "radial-gradient(circle, white 0%, transparent 20%)",
        maskImage: "radial-gradient(circle, white 0%, transparent 20%)",
        WebkitMaskSize: "300% 300%",
        maskSize: "300% 300%",
        WebkitMaskPosition: "center",
        maskPosition: "center"
      },
      {
        opacity: 1,
        filter: "blur(0px) brightness(1) contrast(1)",
        WebkitMaskImage: "radial-gradient(circle, white 100%, transparent 100%)",
        maskImage: "radial-gradient(circle, white 100%, transparent 100%)",
        duration: 3.5,
        ease: "power2.out",
      }, "-=1.5"
    );

    // 2.5 ADIM: LENS SWEEP
    tl.fromTo("#light-beam",
      { x: "-150%", opacity: 0 },
      { x: "150%", opacity: 1, duration: 2.5, ease: "power2.inOut" },
      "-=2.8"
    );

    // 3. ADIM: CONTENT ANIMASYONU (HeroContent girişi)
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 15, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      "-=1.5"
    );

    tlRef.current = tl;
  }, { scope: containerRef });

  // --- 2. GERİ DÖNÜŞ ANİMASYONU (Stacked Scroll için) ---
  useEffect(() => {
    // Eğer loader bitmişse (hasLoaded) ve kullanıcı Hero'ya geri dönmüşse (active)
    // Sadece içeriği (content) hafifçe tekrar canlandırabiliriz.
    if (hasLoaded) {
      if (active) {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out"
        });
      } else {
        // Hero'dan ayrılırken içeriği hafifçe flulaştırıp aşağı itelim
        gsap.to(contentRef.current, {
          opacity: 0,
          y: 10,
          filter: "blur(5px)",
          duration: 0.8
        });
      }
    }
  }, [active, hasLoaded]);

  return (
    <section ref={containerRef} className="relative w-full h-full bg-white overflow-hidden">

      {/* Loader sadece site ilk açıldığında görünür */}
      {!hasLoaded && <HeroLoader ref={overlayRef} spectrumRef={spectrumRef} />}

      {/* 1. ARKA PLAN KATMANI (Görsel) */}
      <div ref={imageWrapperRef} className="absolute inset-0 z-10 overflow-hidden bg-white">
        <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover" />

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

      {/* 2. İÇERİK KATMANI (HeroContent) - BURASI DEĞİŞTİ */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <HeroContent />
        </div>
      </div>

      {/* 3. SCROLL HINT (Bottom) */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${isRevealed && active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
}

export default Hero;
