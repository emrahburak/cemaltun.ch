import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import "./styles.css"; // styles.css dosyasının aynı klasörde olduğundan emin ol

// Görseller
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";

gsap.registerPlugin(Draggable);

// --- YARDIMCI BİLEŞEN: ArrowIcon (Hata veren kısım burasıydı) ---
const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 17 12"
    className={`w-3 h-3 md:w-4 md:h-3 fill-current transition-transform duration-300 ${direction === 'right' ? 'rotate-180' : ''}`}
  >
    <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
  </svg>
);

const GallerySlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderListRef = useRef<HTMLDivElement>(null);
  const stepsParentRef = useRef<HTMLDivElement>(null);

  const images = [g1, g2, g3, g4, g5];
  const totalSlides = images.length;

  useGSAP(() => {
    if (!sliderListRef.current) return;

    const slides = gsap.utils.toArray<HTMLElement>('.slider-slide');
    const nextButton = sectionRef.current?.querySelector('[data-slider="button-next"]');
    const prevButton = sectionRef.current?.querySelector('[data-slider="button-prev"]');
    const allSteps = sectionRef.current?.querySelectorAll('[data-slide-count="step"]');

    let activeElement: HTMLElement | null = null;

    // --- GSAP HORIZONTAL LOOP HELPER ---
    function horizontalLoop(items: HTMLElement[], config: any) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onUpdate: config.onChange && function(this: any) {
          let i = tl.closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            config.onChange(items[i], i);
          }
        },
        onReverseComplete: () => {
          tl.totalTime(tl.rawTime() + tl.duration() * 100);
        }
      }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1),
        totalWidth: number,
        lastIndex = 0;

      gsap.set(items, { xPercent: 0 });

      const populateWidths = () => {
        items.forEach((el, i) => {
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + (gsap.getProperty(el, "xPercent") as number));
        });
      };

      const populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);
          tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
      };

      populateWidths();
      totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number);
      populateTimeline();

      function toIndex(index: number, vars: any) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }

      tl.next = (vars: any) => toIndex(curIndex + 1, vars);
      tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
      tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
      tl.closestIndex = (setCurrent: boolean) => {
        let index = gsap.utils.snap(times, tl.time());
        let i = times.indexOf(index);
        if (setCurrent) curIndex = i;
        return i;
      };

      if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div"),
          wrap = gsap.utils.wrap(0, 1),
          ratio: number, startProgress: number, draggable: any, wasPlaying: boolean,
          align = () => {
            tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio));
          };

        draggable = Draggable.create(proxy, {
          trigger: items[0].parentNode as HTMLElement,
          type: "x",
          onPressInit() {
            gsap.killTweensOf(tl);
            wasPlaying = !tl.paused();
            tl.pause();
            startProgress = tl.progress();
            ratio = 1 / totalWidth;
            gsap.set(proxy, { x: startProgress / -ratio });
          },
          onDrag: align,
          onThrowUpdate: align,
          inertia: true,
          onRelease: () => {
            tl.closestIndex(true);
          },
          onThrowComplete: () => {
            tl.closestIndex(true);
            if (wasPlaying) tl.play();
          }
        })[0];
      }

      return tl;
    }

    // --- SLIDER BAŞLATMA ---
    const loop: any = horizontalLoop(slides, {
      paused: true,
      draggable: true,
      center: false,
      speed: 1,
      onChange: (element: HTMLElement, index: number) => {
        // 1. Önce tüm aktiflikleri temizle
        slides.forEach(s => s.classList.remove("active"));

        // 2. Wrap (Sarma) Mantığı: Index ne olursa olsun 0 ile slides.length arasında tutar.
        // Bu sayede 5'ten sonra otomatik 0 (yani 1. resim) gelir.
        const currentIndex = gsap.utils.wrap(0, slides.length, index);
        const activeSlide = slides[currentIndex];

        activeSlide.classList.add("active");
        activeElement = activeSlide;

        // 3. Sayı sayacını (01, 02...) senkronize et
        if (allSteps) {
          gsap.to(allSteps, {
            y: `${-100 * currentIndex}%`,
            ease: "power3.inOut",
            duration: 0.45
          });
        }
      }
    });

    // --- BUTON VE TIKLAMA OLAYLARI ---

    // Next Butonu: 5. resimdeyse loop.next() otomatik olarak başa (0) döner.
    nextButton?.addEventListener("click", () => {
      loop.next({ ease: "power3", duration: 0.725 });
    });

    // Prev Butonu: 1. resimdeyse loop.previous() otomatik olarak sona (5) döner.
    prevButton?.addEventListener("click", () => {
      loop.previous({ ease: "power3", duration: 0.725 });
    });

    // Resimlere tıklayınca o resme gitme (Index düzeltildi)
    slides.forEach((slide, i) => {
      slide.addEventListener("click", () => {
        loop.toIndex(i, { ease: "power3", duration: 0.725 });
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black text-white relative overflow-hidden min-h-screen flex items-center justify-center">

      {/* OVERLAY: Sayılar ve Navigasyon */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="ml-8 md:ml-24 w-[350px] md:w-[500px] flex flex-col justify-between h-[300px] md:h-[450px] pointer-events-auto">

          <div className="flex items-center text-[60px] md:text-[100px] font-bold leading-none font-sans italic tracking-tighter">
            <div className="h-[1em] overflow-hidden">
              <div ref={stepsParentRef}>
                {images.map((_, i) => (
                  <h2 key={i} data-slide-count="step" className="w-[2ch] text-[1em] leading-none">
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </h2>
                ))}
              </div>
            </div>
            <div className="bg-white/30 w-[1px] md:w-[2px] h-[0.7em] rotate-[15deg] mx-4 md:mx-8"></div>
            <div className="h-[1em] overflow-hidden">
              <h2 className="w-[2ch] text-[1em] leading-none opacity-20">
                {totalSlides < 10 ? `0${totalSlides}` : totalSlides}
              </h2>
            </div>
          </div>

          <div className="overlay-nav-row flex gap-4 md:gap-6">
            <button data-slider="button-prev" className="slider-button border border-white/10 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-xl transition-all duration-400">
              <ArrowIcon direction="left" />
            </button>
            <button data-slider="button-next" className="slider-button border border-white/10 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-xl transition-all duration-400">
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>

      {/* SLIDER: Resimler (Karanlıktan Aydınlığa) */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="w-full h-full flex items-center">
          {/* pl-[500px] resimlerin overlay'den sonra başlamasını sağlar */}
          <div ref={sliderListRef} data-slider="list" className="flex relative pl-[400px] md:pl-[600px]">
            {images.map((img, index) => (
              <div key={index} data-slider="slide" className="slider-slide flex-none w-[300px] md:w-[680px] h-[220px] md:h-[480px] px-4 md:px-8 relative">
                <div className="rounded-[30px] overflow-hidden w-full h-full relative shadow-2xl bg-neutral-900 border border-white/5">
                  <img src={img} className="w-full h-full object-cover" alt={`Archive item ${index}`} />
                  <div className="slide-caption absolute top-8 left-8 bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 opacity-0 transition-all duration-500 shadow-xl">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                      Nº00{index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlide;
