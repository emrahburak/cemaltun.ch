import { useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "../../utils/horizontalloop";
import "./MobileGallerySlide.css";

gsap.registerPlugin(Draggable);

// ... importlar aynı ...

export default function MobileGallerySlide({ images }: { images: string[] }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>('[data-slider="mobile-slide"]');
    if (slides.length === 0) return;

    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true, // Dokunmatik kaydırma aktif
      repeat: -1,
      center: true,
      onChange: (el: HTMLElement, index: number) => {
        setActiveIndex(index);
        gsap.to(slides, { opacity: 0.15, duration: 0.3 });
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    });

    loopRef.current = loop;

    // İlk açılışta zınk diye 0. indekse odakla
    // Başlangıç ayarı
    gsap.set(slides[0], { opacity: 1 });
  }, { scope: mainRef, dependencies: [images] });

  // --- HATASIZ BUTON FONKSİYONLARI ---
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loopRef.current) {
      // currentIndex() hatasından kurtulmak için doğrudan next() kullanıyoruz
      // duration: 0.5 vererek "akıp gitme" sorununu çözüyoruz, zınk diye durur.
      loopRef.current.next({ duration: 0.5, ease: "power2.inOut" });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loopRef.current) {
      loopRef.current.previous({ duration: 0.5, ease: "power2.inOut" });
    }
  };

  return (
    <section ref={mainRef} className="mobile-gallery-section relative overflow-hidden">

      {/* COUNTER */}
      <div className="mobile-counter relative z-30">
        <span className="text-white">{(activeIndex + 1).toString().padStart(2, '0')}</span>
        <div className="mobile-counter-divider"></div>
        <span className="opacity-30 text-[0.6em]">{images.length.toString().padStart(2, '0')}</span>
      </div>

      {/* SLIDER - z-index'i butonlardan düşük tutuyoruz */}
      <div className="w-full overflow-hidden relative z-10 py-8">
        <div className="flex touch-pan-y items-center">
          {images.map((src, i) => (
            <div key={i} data-slider="mobile-slide" className="mobile-slide">
              <div className="mobile-slide-inner">
                <img src={src} alt={`Slide ${i}`} className="select-none pointer-events-none w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUTONLAR - En üst katman ve tıklanabilir (pointer-events-auto) */}
      <div className="mobile-nav-row relative z-[100] pointer-events-auto flex flex-row gap-12 mt-8">
        <button
          onClick={handlePrev}
          className="mobile-button cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Previous"
        >
          <div className="mobile-button-overlay">
            <div className="mobile-corner top-left"></div>
            <div className="overlay-corner top-right"></div>
            <div className="overlay-corner bottom-left"></div>
            <div className="overlay-corner bottom-right"></div>
          </div>
          <svg viewBox="0 0 17 12" className="mobile-arrow"><path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" /></svg>
        </button>

        <button
          onClick={handleNext}
          className="mobile-button cursor-pointer"
          style={{ pointerEvents: 'auto' }}
          aria-label="Next"
        >
          <div className="mobile-button-overlay">
            <div className="mobile-corner top-left"></div>
            <div className="overlay-corner top-right"></div>
            <div className="overlay-corner bottom-left"></div>
            <div className="overlay-corner bottom-right"></div>
          </div>
          <svg viewBox="0 0 17 12" className="mobile-arrow next"><path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" /></svg>
        </button>
      </div>

    </section>
  );
}
