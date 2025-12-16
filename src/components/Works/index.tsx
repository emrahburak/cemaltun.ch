import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { usePageTheme } from "../../hooks/usePageTheme";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Navbar rengini SİYAH yapmak için (Açık zemin)
  const containerRef = usePageTheme(false);

  const worksData = [
    { id: "1", title: "Bursa'nın İzleri", year: "2023", desc: "A journey through historical soundscapes." },
    { id: "2", title: "Zurich Briefzentrum", year: "2022", desc: "Industrial rhythm meets neoclassical piano." },
    { id: "3", title: "Silent City", year: "2021", desc: "An atmospheric study on urban isolation." },
    { id: "4", title: "The Last Train", year: "2024", desc: "Emotional cinematic orchestral piece." },
  ];

  useGSAP(() => {
    const pinDistance = scrollRef.current ? scrollRef.current.offsetWidth - window.innerWidth : 0;

    gsap.to(scrollRef.current, {
      x: -pinDistance,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true, // Bölümü ekrana sabitler
        scrub: 1,  // Kaydırma hızına göre animasyonu eşler
        start: "top top",
        end: () => `+=${pinDistance}`, // Yatay genişlik kadar dikey scroll mesafesi yaratır
        invalidateOnRefresh: true,
      }
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        // containerRef'in içindeki current'a el'i 'any' diyerek paslıyoruz
        (containerRef as any).current = el;
      }}
      id="works"
      className="h-screen w-full overflow-hidden bg-[#f5f5f5]"
    >

      {/* Yatay Kayan Konteyner */}
      <div
        ref={scrollRef}
        className="h-full flex items-center px-[10vw] gap-[10vw] w-fit"
      >
        {/* Başlık Kartı */}
        <div className="flex-shrink-0 w-[30vw]">
          <h2 className="text-xs font-manrope font-bold mb-4 tracking-[0.4em] uppercase opacity-40">
            {t('navbar.works')}
          </h2>
          <h3 className="text-6xl font-isidora font-light leading-tight">
            Selected <br /> Audio <br /> Works
          </h3>
        </div>

        {/* Eser Kartları */}
        {worksData.map((work) => (
          <div
            key={work.id}
            className="flex-shrink-0 w-[40vw] group cursor-pointer"
          >
            <div className="border-l border-black/10 pl-8 transition-all duration-500 group-hover:border-black/40">
              <span className="text-[10px] font-manrope tracking-widest opacity-40 uppercase">
                {work.year}
              </span>
              <h4 className="text-4xl font-isidora my-4 group-hover:italic transition-all uppercase">
                {work.title}
              </h4>
              <p className="text-sm font-manrope opacity-60 max-w-sm leading-relaxed italic">
                {work.desc}
              </p>

              {/* Listen Butonu */}
              <button className="mt-8 flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase">
                <span className="w-8 h-[1px] bg-black"></span>
                Listen Story
              </button>
            </div>
          </div>
        ))}

        {/* Bitiş Boşluğu */}
        <div className="flex-shrink-0 w-[20vw]"></div>
      </div>
    </section>
  );
};

export default Works;
