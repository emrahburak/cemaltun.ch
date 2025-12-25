import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface WorksProps {
  active?: boolean;
}

const Works = ({ active }: WorksProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const playlistId = "7p5QAaOmaMttoBJCTwIE4e";

  useGSAP(() => {
    if (!containerRef.current) return;

    // Timeline'ı oluşturuyoruz (duraklatılmış)
    const tl = gsap.timeline({ paused: true });

    // Seçici: .works-reveal sınıfına sahip blokları hedefler
    tl.fromTo(
      containerRef.current.querySelectorAll(".works-reveal"),
      {
        opacity: 0,
        y: 40,
        filter: "blur(15px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15, // Bloklar arası asil geçiş
        ease: "power3.out",
        clearProps: "filter"
      }
    );

    // Spotify Embed'i ayrıca hafif bir gecikmeyle (scale ile) ekliyoruz
    tl.fromTo(
      containerRef.current.querySelector(".spotify-container"),
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" },
      "-=1" // Önceki animasyon bitmeden başlasın
    );

    tlRef.current = tl;
  }, { scope: containerRef });

  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [active]);

  return (
    <section
      ref={containerRef}
      id="works"
      className="w-full h-full flex items-center justify-center bg-[#f5f5f5] px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* SOL TARAF: Başlık ve Açıklama */}
        <div className="lg:col-span-5 space-y-8">
          <div className="works-reveal">
            {/* Mobil Başlık */}
            <h2 className="block md:hidden text-[10px] font-manrope font-bold mb-4 tracking-[0.5em] uppercase opacity-40 text-black">
              {t('navbar.works')}
            </h2>

            {/* Ana Başlık (Blok olarak geliyor) */}
            <h3 className="text-5xl md:text-7xl font-urbanist font-light leading-[1.1] tracking-tight text-black text-left">
              {t('works.selected')}
              <br />
              <span className="italic text-black/70 font-normal underline decoration-1 underline-offset-8 font-urbanist">
                {t('works.title')}
              </span>
            </h3>
          </div>

          {/* Açıklama Metni (Blok olarak geliyor) */}
          <p className="works-reveal font-manrope text-sm md:text-base opacity-60 max-w-sm leading-relaxed border-l border-black/10 pl-6 text-black text-left italic">
            {t('works.desc')}
          </p>

          {/* Buton (Blok olarak geliyor) */}
          <div className="works-reveal pt-4 flex justify-start">
            <a
              href={`https://open.spotify.com/playlist/${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-[10px] font-manrope font-bold tracking-[0.2em] uppercase text-black"
            >
              <span className="w-10 h-[1px] bg-black transition-all duration-500 group-hover:w-16"></span>
              {t('works.open_spotify')}
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: Playlist Embed (Özel Container) */}
        <div className="spotify-container lg:col-span-7 w-full h-[500px] md:h-[650px] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Works;
