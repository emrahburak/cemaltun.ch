import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-09.webp";

// Yeni Bileşenler
import HeroLoader from "../HeroLoader";
import HeroContent from "../HeroContent";

const Hero = () => {
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

    // 1. ADIM: LOADER ANIMASYONU
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

    // 2. ADIM: IMAGE REVEAL (WHITE AMBIGUITY)
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

    // 3. ADIM: CONTENT ANIMASYONU
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 15, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
      "-=1.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden">

      <HeroLoader ref={overlayRef} spectrumRef={spectrumRef} />

      {/* ANA GÖRSEL KATMANI */}
      <div ref={imageWrapperRef} className="absolute inset-0 z-10 overflow-hidden">
        <img src={defaultImage} alt="Cem Altun" className="w-full h-full object-cover" />

        <div
          id="light-beam"
          className="absolute inset-0 z-20 opacity-0 pointer-events-none"
          style={{
            background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
            transform: "translateX(-100%) skewX(-20deg) scale(1.5)",
            filter: "blur(40px)"
          }}
        />

        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-[3000ms] ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <HeroContent ref={contentRef} />

      {/* SCROLL HINT */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

    </section>
  );
};

export default Hero;
