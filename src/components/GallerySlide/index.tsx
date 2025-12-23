import { useRef, useState } from "react"; // useState eklendi
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { horizontalLoop } from "../../utils/horizontalloop";
import "./GallerySlider.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Lightbox İthalatları
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

gsap.registerPlugin(Draggable, ScrollTrigger);

export default function GallerySlider({ images }: { images: string[] }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<any>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const { t } = useTranslation();
  const quoteText = t("gallery.quote");

  // --- LIGHTBOX STATE ---
  const [index, setIndex] = useState(-1); // -1 kapalı, >= 0 ise açık olan resmin indeksi

  useGSAP(() => {
    const slides = gsap.utils.toArray<HTMLElement>('[data-slider="slide"]');
    const allSteps = mainRef.current?.querySelectorAll<HTMLElement>('[data-slide-count="step"]');

    if (slides.length === 0) return;

    const loop = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      repeat: -1,
      onChange: (el: HTMLElement, index: number) => {
        gsap.to(slides, { opacity: 0.2, duration: 0.3, ease: "power2.inOut" });
        gsap.to(el, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
        el.classList.add("active");

        if (allSteps) {
          gsap.to(allSteps, {
            yPercent: -100 * index,
            duration: 0.5,
            ease: "power3.inOut",
            overwrite: true
          });
        }
      }
    });

    loopRef.current = loop;

    if (quoteRef.current) {
      const chars = quoteRef.current.children;
      gsap.fromTo(chars,
        { opacity: 0, y: 10, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "expo.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 95%",
            once: true,
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: mainRef, dependencies: [images] });

  const handleNext = () => {
    if (loopRef.current) loopRef.current.next({ duration: 0.7, ease: "power3.inOut" });
  };

  const handlePrev = () => {
    if (loopRef.current) loopRef.current.previous({ duration: 0.7, ease: "power3.inOut" });
  };

  return (
    <div ref={mainRef} className="osmo-gallery-section">


      {/* LIGHTBOX BİLEŞENİ */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />
      <div className="absolute top-12 left-12 pointer-events-none z-10">
        <h2 className="text-lg font-manrope font-bold tracking-[0.5em] uppercase opacity-60 text-white">
          {t('navbar.gallery')}
        </h2>
      </div>


      {/* OVERLAY LAYER */}
      <div className="overlay pointer-events-none">
        <div className="overlay-inner flex flex-col justify-between h-[28.125em] pointer-events-auto">
          {/* Sayı Counter */}
          <div className="overlay-count-row">
            <div className="count-column">
              <div className="count-column-inner">
                {images.map((_, i) => (
                  <h2 key={i} data-slide-count="step" className="count-heading">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </h2>
                ))}
              </div>
            </div>
            <div className="count-row-divider"></div>
            <div className="count-column opacity-30">
              <h2 className="count-heading">{images.length < 10 ? `0${images.length}` : images.length}</h2>
            </div>
          </div>

          {/* QUOTE BÖLÜMÜ */}
          <div className="flex flex-col items-start max-w-[20em]">
            <div
              ref={quoteRef}
              className="font-sollarish text-[0.7em] uppercase leading-relaxed tracking-[0.15em] italic text-white/90"
            >
              {quoteText.split("").map((char, index) => (
                <span key={index} className="inline-flex flex-wrap">
                  <span className="inline-block whitespace-pre">{char}</span>
                  {char === "," && <div className="w-full h-0 pointer-events-none" />}
                </span>
              ))}
            </div>
          </div>

          {/* NAVIGASYON */}
          <div className="overlay-nav-row flex flex-row gap-8 items-center">
            <button onClick={handlePrev} className="button group" aria-label="Previous Slide">
              <div className="button-overlay">
                <div className="overlay-corner top-left"></div>
                <div className="overlay-corner top-right"></div>
                <div className="overlay-corner bottom-left"></div>
                <div className="overlay-corner bottom-right"></div>
              </div>
              <svg viewBox="0 0 17 12" className="button-arrow">
                <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
              </svg>
            </button>

            <button onClick={handleNext} className="button group" aria-label="Next Slide">
              <div className="button-overlay">
                <div className="overlay-corner top-left"></div>
                <div className="overlay-corner top-right"></div>
                <div className="overlay-corner bottom-left"></div>
                <div className="overlay-corner bottom-right"></div>
              </div>
              <svg viewBox="0 0 17 12" className="button-arrow next">
                <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER MAIN AREA */}
      <div className="main">
        <div className="slider-wrap">
          <div data-slider="list" className="slider-list">
            {images.map((src, i) => (
              <div
                key={i}
                data-slider="slide"
                className={`slider-slide ${i === 0 ? 'active' : ''}`}
                onClick={() => setIndex(i)} // Tıklanınca ilgili indeksi açar
                style={{ cursor: 'pointer' }} // UX için imleç değişimi
              >
                <div className="slide-inner group">
                  <img
                    src={src}
                    alt={`Slide ${i}`}
                    className="w-full h-full object-cover select-none" // pointer-events-none kaldırıldı ki tıklama yakalansın
                  />
                  <div className="slide-caption">
                    <div className="caption-dot"></div>
                    <p className="caption">Nº00{i + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
