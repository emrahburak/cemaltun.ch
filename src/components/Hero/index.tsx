import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import defaultImage from "@/assets/images/piano/webp/cem-altun-piano-09.webp";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const [showIntro, setShowIntro] = useState(false);

  useGSAP(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Daha yavaş ve dramatik bir zoom için süreyi artırdım
        scrub: 1,      // Scroll ile tam senkronize (yumuşatma kapalı - anlık tepki için)
        pin: true,     // Ekranı sabitler
        onUpdate: (self) => {
          // Scroll %85'e ulaştığında Intro'yu tetikle
          setShowIntro(self.progress > 0.85);
        }
      }
    });

    // --- GSAP ANİMASYONLARI ---

    // 1. Görselin Merkezden Büyümesi (Telescope Effect)
    tl.fromTo(imageWrapperRef.current,
      {
        width: "0px",  // BAŞLANGIÇTA TAMAMEN GİZLİ (Pürüz 1 Çözümü)
        height: "0px",
        opacity: 0, // Ekstra güvenlik için
        borderRadius: "50%", // Dairesel başlasın (iris efekti gibi)
      },
      {
        width: "100%", // Parent'ın %100'ünü kapla (Pürüz 2 Çözümü - vw yerine %)
        height: "100%",
        opacity: 1,
        borderRadius: "0px", // Köşeliye dönüş
        ease: "power2.inOut", // Daha sinematik bir hızlanma/yavaşlama
        duration: 1 // Timeline içinde oransal süre
      }, 0);

    // 2. Yazıların Yanlara Açılması
    tl.to(".hero-text-cem", { x: "-120vw", opacity: 0, ease: "power2.in" }, 0)
      .to(".hero-text-altun", { x: "120vw", opacity: 0, ease: "power2.in" }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-white overflow-hidden">

      {/* --- 1. KATMAN: ZOOM YAPAN GÖRSEL --- */}
      {/* Başlangıçta merkezde 0px boyutunda, mutlak pozisyonlu */}
      <div
        ref={imageWrapperRef}
        className="hero-image-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden shadow-2xl"
      >
        <img
          src={defaultImage}
          alt="Cem Altun"
          // Görsel her zaman container'ı dolduracak ama deforme olmayacak
          className="w-full h-full object-cover scale-105"
        />
        {/* Intro geldiğinde devreye giren karartma perdesi */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1000 ${showIntro ? 'opacity-100' : 'opacity-0'}`} />
      </div>


      {/* --- 2. KATMAN: BAŞLANGIÇ YAZISI (CEM ALTUN) --- */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {/* Aradaki boşluğu (gap) kaldırdık, başlangıçta bitişik duracaklar */}
        <div className="flex items-center justify-center">
          {/* Sağdan biraz padding vererek görselin çıkacağı yeri işaretliyoruz */}
          <span className="hero-text-cem font-urbanist text-6xl md:text-8xl lg:text-[10rem] font-black text-black tracking-tighter pr-1 md:pr-2">
            CEM
          </span>
          {/* Soldan padding */}
          <span className="hero-text-altun font-urbanist text-6xl md:text-8xl lg:text-[10rem] font-black text-black tracking-tighter pl-1 md:pl-2">
            ALTUN
          </span>
        </div>
      </div>


      {/* --- 3. KATMAN: CINEMATIC INTRO (Final Sahne) --- */}
      <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white transition-all duration-1000 ${showIntro ? "opacity-100 translate-y-0 blur-0 delay-300" : "opacity-0 translate-y-10 blur-lg pointer-events-none"
        }`}>

        <div className="space-y-6 md:space-y-10 px-4">
          <p className="font-manrope text-[10px] md:text-xs tracking-[0.6em] uppercase opacity-70 font-semibold">
            Official Website
          </p>
          <h1 className="font-urbanist text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter  drop-shadow-lg">
            CEM ALTUN
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-6 font-manrope text-[10px] md:text-sm tracking-[0.3em] uppercase opacity-80 font-semibold">
            <span>Composer</span>
            <span className="w-1 h-1 bg-white/60 rounded-full"></span>
            <span>Zürich</span>
          </div>
        </div>

        {/* Scroll Hint - Intro geldiğinde kaybolsun */}
        <div className={`absolute bottom-12 flex flex-col items-center gap-4 transition-opacity duration-500 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
          <span className="font-manrope text-[9px] tracking-[0.4em] uppercase opacity-40 animate-pulse text-black">
            Scroll to Zoom
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
