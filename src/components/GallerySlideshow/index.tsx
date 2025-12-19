import { useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import "./styles.css"

gsap.registerPlugin(Observer);

const slideTitles = [
  "Cosmic Harmony", "Astral Journey", "Ethereal Vision",
  "Quantum Field", "Celestial Path", "Cosmic Whisper"
];

const images = [
  "https://cdn.cosmos.so/1d4dbaff-8087-4451-a727-9d3266b573dd?format=jpeg",
  "https://cdn.cosmos.so/67ef01f5-09c8-4117-9199-04ec5323d64f?format=jpeg",
  "https://cdn.cosmos.so/77f73423-0eb7-4eaa-a782-036457985290?format=jpeg",
  "https://cdn.cosmos.so/3dd498a9-169d-4b69-8e2e-df042123c124?format=jpeg",
  "https://cdn.cosmos.so/ca346107-04c8-4241-85e6-f26c8b64c85c?format=jpeg",
  "https://cdn.cosmos.so/7d2c5113-b2d3-4f9d-8215-f46fbb679f31?format=jpeg"
];

const GallerySlideshow = () => {
  const container = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const isAnimating = useRef(false);

  // useGSAP ile scoping ve cleanup otomatik hallolur
  const { contextSafe } = useGSAP({ scope: container });

  // Waveform (Çizgi) Animasyonu
  const updateDragLines = contextSafe((activeIndex: number | null) => {
    const lines = gsap.utils.toArray<HTMLElement>(".drag-line");
    if (!lines.length) return;

    // Reset
    gsap.to(lines, { height: 15, backgroundColor: "rgba(255, 255, 255, 0.3)", duration: 0.4 });

    if (activeIndex === null) return;

    const thumbWidth = 720 / images.length;
    const centerPosition = (activeIndex + 0.5) * thumbWidth;
    const lineWidth = 720 / lines.length;

    lines.forEach((line, i) => {
      const linePosition = (i + 0.5) * lineWidth;
      const distFromCenter = Math.abs(linePosition - centerPosition);
      const maxDistance = thumbWidth * 0.7;

      if (distFromCenter <= maxDistance) {
        const normalizedDist = distFromCenter / maxDistance;
        const waveHeight = Math.cos((normalizedDist * Math.PI) / 2);
        gsap.to(line, {
          height: 15 + waveHeight * 35,
          backgroundColor: `rgba(255, 255, 255, ${0.3 + waveHeight * 0.4})`,
          duration: 0.5,
          delay: normalizedDist * 0.1
        });
      }
    });
  });

  // Navigasyon Fonksiyonu (Slide Değişimi)
  const navigate = contextSafe((direction: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const slides = gsap.utils.toArray<HTMLElement>(".slide");
    const slideInners = gsap.utils.toArray<HTMLElement>(".slide__img");

    const previous = index;
    const next = direction === 1
      ? (index < images.length - 1 ? index + 1 : 0)
      : (index > 0 ? index - 1 : images.length - 1);

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setIndex(next);
      }
    });

    tl.addLabel("start", 0)
      .set(slides[next], { zIndex: 99, opacity: 1, pointerEvents: "auto" })
      .fromTo(slides[next],
        { scale: 0.1, yPercent: direction === 1 ? 100 : -100 },
        { duration: 0.8, ease: "expo.inOut", scale: 0.4, yPercent: 0 }, "start")
      .fromTo(slideInners[next],
        { transformOrigin: "50% 50%", scaleY: 3, filter: "brightness(2)" },
        { duration: 0.8, ease: "expo.inOut", scaleY: 1, filter: "brightness(1)" }, "start")
      .to(slides[next], { duration: 1, ease: "power4.inOut", scale: 1 }, "start+=0.6")
      .to(slides[previous], { duration: 1, ease: "power4.inOut", scale: 0.9, opacity: 0 }, "start+=0.6");

    updateDragLines(next);
  });

  // İlk render ve etkileşimler için useGSAP
  useGSAP(() => {
    // Observer kurulumu
    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      onUp: () => navigate(1),
      onDown: () => navigate(-1),
      wheelSpeed: -1,
      tolerance: 10,
    });

    // Klavye
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);

    // Initial Lines
    updateDragLines(index);

    return () => window.removeEventListener("keydown", handleKey);
  }, { scope: container, dependencies: [index] });

  return (
    <section ref={container} className="gallery-slideshow w-full h-screen bg-black relative overflow-hidden">
      <div className="scroll-hint fixed top-8 right-8 text-[10px] tracking-widest uppercase opacity-40">
        Scroll / Drag
      </div>

      <div className="bottom-ui-container fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[720px] pb-10 z-[100] flex flex-col items-center">
        <div className="slide-section text-2xl font-bold tracking-[0.2em] mb-8 uppercase opacity-80">
          Cosmic Series
        </div>

        <div className="slide-counter w-full flex justify-between items-center mb-6 px-4">
          <button className="counter-nav" onClick={() => navigate(-1)}>⟪</button>
          <div className="counter-display flex gap-3 text-xs tracking-widest">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="opacity-30">//</span>
            <span>{String(images.length).padStart(2, "0")}</span>
          </div>
          <button className="counter-nav" onClick={() => navigate(1)}>⟫</button>
        </div>

        <div className="slide-title-container h-8 mb-4 overflow-hidden relative w-full text-center">
          <div className="slide-title text-lg opacity-80">{slideTitles[index]}</div>
        </div>

        <div className="drag-indicator w-full h-[50px] mb-2 relative">
          <div className="lines-container flex items-end justify-between h-full w-full">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="drag-line w-[2px] bg-white/30 origin-bottom transition-colors duration-500"></div>
            ))}
          </div>
        </div>

        <div className="thumbs-container w-full overflow-hidden bg-black/50">
          <div className="slide-thumbs flex">
            {images.map((img, i) => (
              <div
                key={i}
                className={`slide-thumb h-20 flex-1 bg-cover bg-center cursor-pointer transition-opacity duration-500 ${index === i ? "opacity-100 active" : "opacity-40"}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => {
                  if (i !== index) navigate(i > index ? 1 : -1);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="slides w-full h-full relative grid place-items-center">
        {images.map((img, i) => (
          <div key={i} className={`slide absolute inset-0 opacity-0 pointer-events-none grid place-items-center overflow-hidden ${index === i ? "slide--current" : ""}`}>
            <div
              className="slide__img w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySlideshow;
