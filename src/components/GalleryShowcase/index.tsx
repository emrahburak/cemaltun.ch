import { useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import "./styles.css"

// Görsel Assetleri
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";

gsap.registerPlugin(Draggable);

const CONFIG = {
  totalCards: 12,
  wheelRadius: 35,
  images: [g1, g2, g3, g4, g5, g1, g2, g3, g4, g5, g1, g2], // 12'ye tamamladık
  animations: {
    transitionDuration: 1.2,
  }
};

const GalleryShowcase = () => {
  const container = useRef<HTMLDivElement>(null);
  const itemsContainer = useRef<HTMLDivElement>(null);
  const [currentPattern, setCurrentPattern] = useState("circle");
  const isTransitioning = useRef(false);
  const draggableInstance = useRef<any>(null);

  const { contextSafe } = useGSAP({ scope: container });

  // Yardımcı Fonksiyon: Viewport ve Kart Ölçüleri
  const getLayoutData = () => {
    const vW = window.innerWidth;
    const vH = window.innerHeight;
    const cardW = vH > 800 ? 350 : 300; // CSS media queryleri ile paralel
    return { vW, vH, cardW, minDim: Math.min(vW, vH) };
  };

  // 1. CIRCLE LAYOUT
  const setupCircle = contextSafe((animated = true) => {
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-item");
    const { minDim } = getLayoutData();
    const radius = minDim * (CONFIG.wheelRadius / 100);
    const angleStep = (2 * Math.PI) / CONFIG.totalCards;
    const currentWheelRot = gsap.getProperty(itemsContainer.current, "rotation") as number || 0;
    const rotRad = currentWheelRot * (Math.PI / 180);

    const tl = gsap.timeline();
    cards.forEach((card, i) => {
      const angle = i * angleStep + rotRad;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      const vars = {
        x, y, rotation: -currentWheelRot, scale: 0.8,
        duration: animated ? CONFIG.animations.transitionDuration : 0,
        ease: "power2.inOut"
      };
      animated ? tl.to(card, vars, 0) : gsap.set(card, vars);
    });

    if (animated) tl.add(() => setupDraggable("rotation"), "-=0.5");
  });

  // 2. WAVE LAYOUT
  const setupWave = contextSafe(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-item");
    const { vW, vH, cardW } = getLayoutData();
    const lineWidth = Math.min(vW * 0.8, CONFIG.totalCards * cardW * 0.4);
    const spacing = lineWidth / (CONFIG.totalCards - 1);
    const waveH = Math.min(vH * 0.1, 80);

    const tl = gsap.timeline();
    tl.to(itemsContainer.current, { rotation: 0, duration: 1, ease: "power2.inOut" }, 0);

    cards.forEach((card, i) => {
      const x = (i - (CONFIG.totalCards - 1) / 2) * spacing;
      const y = Math.sin((i / (CONFIG.totalCards - 1)) * Math.PI * 2) * waveH;
      tl.to(card, { x, y, rotation: 0, scale: 0.7, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
    });

    tl.to(cards, {
      y: (i) => {
        const norm = i / (CONFIG.totalCards - 1);
        return Math.sin(norm * Math.PI * 2 + Math.PI) * waveH;
      },
      duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut"
    });
  });

  // 3. GRID LAYOUT
  const setupGrid = contextSafe(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-item");
    const { vW, vH } = getLayoutData();
    const rows = vW > vH ? 3 : 4;
    const cols = vW > vH ? 4 : 3;
    const xSpacing = 280, ySpacing = 350;

    const tl = gsap.timeline();
    tl.to(itemsContainer.current, { rotation: 0, duration: 1 }, 0);

    cards.forEach((card, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * xSpacing;
      const y = (row - (rows - 1) / 2) * ySpacing;
      tl.to(card, { x, y, rotation: 0, scale: 0.5, duration: CONFIG.animations.transitionDuration, ease: "power2.inOut" }, 0);
    });
  });

  // DRAGGABLE KURULUMU
  const setupDraggable = contextSafe((type: "rotation") => {
    if (draggableInstance.current) draggableInstance.current.kill();

    draggableInstance.current = Draggable.create(itemsContainer.current, {
      type,
      inertia: true,
      onDrag: function() {
        const rot = this.rotation;
        gsap.set(".carousel-item", { rotation: -rot });
      },
      onThrowUpdate: function() {
        const rot = this.rotation;
        gsap.set(".carousel-item", { rotation: -rot });
      }
    })[0];
  });

  // MOUSE TRACKING (3D Depth & Stagger için)
  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (isTransitioning.current) return;
    const { vW, vH } = getLayoutData();
    const mX = (e.clientX / vW) - 0.5;
    const mY = (e.clientY / vH) - 0.5;

    if (currentPattern === "depth") {
      gsap.to(itemsContainer.current, {
        rotationY: mX * 5,
        rotationX: -mY * 5,
        duration: 1.2,
        ease: "power1.out"
      });
    }
  });

  // ANA GEÇİŞ TETİKLEYİCİ
  const changePattern = contextSafe((pattern: string) => {
    if (isTransitioning.current || pattern === currentPattern) return;
    isTransitioning.current = true;
    setCurrentPattern(pattern);

    gsap.killTweensOf(".carousel-item");
    if (draggableInstance.current) draggableInstance.current.kill();

    // Pattern Seçimi
    if (pattern === "circle") setupCircle();
    else if (pattern === "wave") setupWave();
    else if (pattern === "grid") setupGrid();
    // Diğer patternlar buraya eklenebilir (fan, depth vs.)

    setTimeout(() => { isTransitioning.current = false; }, 1200);
  });

  // INITIAL ANIMATION
  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".carousel-item");
    gsap.set(cards, { opacity: 0, scale: 0 });
    gsap.set(".switch", { opacity: 0, y: 50 });

    const tl = gsap.timeline({ onComplete: () => { isTransitioning.current = false; setupCircle(true); } });

    tl.to(cards, {
      opacity: 1, scale: 0.8, duration: 0.5, stagger: { each: 0.1, from: "end" }, ease: "power2.out"
    })
      .to(".switch", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" });

  }, { scope: container });

  return (
    <div ref={container} className="carousel-wrapper" onMouseMove={handleMouseMove}>
      <div className="carousel-container">
        <div ref={itemsContainer} className="carousel-items">
          {CONFIG.images.map((img, i) => (
            <div
              key={i}
              className="carousel-item"
              style={{ backgroundImage: `url(${img})`, zIndex: CONFIG.totalCards - i }}
            >
              <div className="card__number">{String(i + 1).padStart(3, "0")}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="switch">
        {["circle", "wave", "grid", "fan", "depth"].map((p) => (
          <button
            key={p}
            className={`switch-button ${currentPattern === p ? "switch-button-current" : ""}`}
            onClick={() => changePattern(p)}
          >
            <span className="indicator-dot"></span>
            {p.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryShowcase;
