import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface DesktopWorksProps {
  active?: boolean;
}

const DesktopWorks = ({ active }: DesktopWorksProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const playlistId = "7p5QAaOmaMttoBJCTwIE4e";

  useGSAP(() => {
    if (!containerRef.current) return;

    // Timeline: Sayfaya giriş animasyonu
    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      containerRef.current.querySelectorAll(".works-reveal"),
      { opacity: 0, y: 50, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }
    );

    tl.fromTo(
      containerRef.current.querySelector(".spotify-container"),
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out" },
      "-=0.8"
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
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-[#f5f5f5] px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-12 gap-20 items-center">

        {/* SOL TARAF: İÇERİK */}
        <div className="col-span-5 space-y-10">
          <div className="works-reveal">
            <h2 className="text-[10px] font-manrope font-bold mb-4 tracking-[0.5em] uppercase opacity-40 text-black">
              {t('navbar.works')}
            </h2>
            <h3 className="text-7xl font-urbanist font-light leading-[1.1] tracking-tight text-black">
              {t('works.selected')}
              <br />
              <span className="italic text-black/70 font-normal underline decoration-1 underline-offset-8 font-urbanist">
                {t('works.title')}
              </span>
            </h3>
          </div>

          <p className="works-reveal font-manrope text-base opacity-60 max-w-sm leading-relaxed border-l border-black/10 pl-8 text-black italic">
            {t('works.desc')}
          </p>

          <div className="works-reveal pt-4">
            <a
              href={`https://open.spotify.com/playlist/${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 text-[10px] font-manrope font-bold tracking-[0.3em] uppercase text-black"
            >
              <span className="w-12 h-[1px] bg-black transition-all duration-500 group-hover:w-20"></span>
              {t('works.open_spotify')}
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: SPOTIFY (Direkt ve Net) */}
        <div className="spotify-container col-span-7 w-full h-[650px] shadow-[0_30px_60px_rgba(0,0,0,0.12)]">
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
    </div>
  );
};

export default DesktopWorks;
