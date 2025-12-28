import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MobileWorksProps {
  active?: boolean;
}

const MobileWorks = ({ active }: MobileWorksProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Mobil etkileşim kilidi
  const [isIframeActive, setIsIframeActive] = useState(false);
  const playlistId = "7p5QAaOmaMttoBJCTwIE4e";

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // İçerik animasyonları
    tl.fromTo(
      containerRef.current.querySelectorAll(".works-reveal"),
      { opacity: 0, y: 20, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // Spotify kutusu animasyonu
    tl.fromTo(
      containerRef.current.querySelector(".spotify-container"),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: "expo.out" },
      "-=0.4"
    );

    tlRef.current = tl;
  }, { scope: containerRef });

  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
      setIsIframeActive(false);
    }
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center px-6 overflow-hidden bg-white"
    >
      <div className="w-full flex flex-col gap-6 py-8">

        {/* METİN İÇERİĞİ (ÜSTTE) */}
        <div className="space-y-4 flex flex-col items-start">
          <div className="works-reveal">
            <h2 className="text-[10px] font-manrope font-bold mb-2 tracking-[0.4em] uppercase opacity-40 text-black">
              {t('navbar.works')}
            </h2>
            <h3 className="text-3xl font-urbanist font-light leading-tight tracking-tight text-black">
              {t('works.selected')}
              <br />
              <span className="italic text-black/70 font-normal underline decoration-1 underline-offset-4 font-urbanist">
                {t('works.title')}
              </span>
            </h3>
          </div>

          <p className="works-reveal font-manrope text-xs opacity-60 max-w-[280px] leading-relaxed border-l border-black/10 pl-4 text-black italic text-left">
            {t('works.desc')}
          </p>

          <div className="works-reveal pt-1">
            <a
              href={`https://open.spotify.com/playlist/${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-[9px] font-manrope font-bold tracking-[0.2em] uppercase text-black"
            >
              <span className="w-8 h-[1px] bg-black"></span>
              {t('works.open_spotify')}
            </a>
          </div>
        </div>

        {/* SPOTIFY PLAYER (ALTTA) */}
        <div className="spotify-container w-full relative h-[380px] shadow-xl rounded-xl overflow-hidden bg-white/5">

          {/* TAP TO LISTEN OVERLAY */}
          {!isIframeActive && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsIframeActive(true);
              }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/5 backdrop-blur-[4px] cursor-pointer"
            >
              <div className="bg-white/95 text-black px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] shadow-2xl flex items-center gap-3">
                <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                {t('works.tap_to_listen').toUpperCase()}
              </div>
            </div>
          )}

          {/* SPOTIFY IFRAME */}
          <div className={`w-full h-full transition-all duration-700 ${!isIframeActive ? 'opacity-50 blur-[3px]' : 'opacity-100 blur-0'}`}>
            <iframe
              src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileWorks;
