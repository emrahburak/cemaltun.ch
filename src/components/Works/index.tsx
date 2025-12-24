import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const spotifyRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const playlistId = "7p5QAaOmaMttoBJCTwIE4e";

  useGSAP(() => {
    // 1. ANA BAŞLIK ANİMASYONU (Selected Works)
    const headingChars = headingRef.current?.querySelectorAll(".char");
    if (headingChars) {
      gsap.fromTo(headingChars,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 2. AÇIKLAMA METNİ ANİMASYONU
    const descChars = descRef.current?.querySelectorAll(".char");
    if (descChars) {
      gsap.fromTo(descChars,
        { opacity: 0, x: 15, filter: "blur(5px)" },
        {
          opacity: 0.6, // Orijinal opacity değerine sadık kaldık
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.01,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // 3. BUTON ANİMASYONU
    gsap.fromTo(buttonRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 95%"
        }
      }
    );

    // 4. SAĞ TARAF: SPOTIFY EMBED ANİMASYONU
    gsap.fromTo(spotifyRef.current,
      { opacity: 0, scale: 0.98, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: spotifyRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="works"
      className="w-full h-screen flex items-center justify-center bg-[#f5f5f5] px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* SOL TARAF: Başlık ve Açıklama */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="block md:hidden text-[10px] font-manrope font-bold mb-4 tracking-[0.5em] uppercase opacity-40 text-black">
              {t('navbar.works')}
            </h2>

            <h3 ref={headingRef} className="text-5xl md:text-7xl font-urbanist font-light leading-[1.1] tracking-tight text-black text-left">
              {t('works.selected').split("").map((char, i) => (
                <span key={i} className="char inline-block whitespace-pre">{char}</span>
              ))}
              <br />
              <span className="italic text-black/70 font-normal underline decoration-1 underline-offset-8 font-urbanist">
                {t('works.title').split("").map((char, i) => (
                  <span key={i} className="char inline-block whitespace-pre">{char}</span>
                ))}
              </span>
            </h3>
          </div>

          <p ref={descRef} className="font-manrope text-sm md:text-base opacity-60 max-w-sm leading-relaxed border-l border-black/10 pl-6 text-black text-left italic">
            {t('works.desc').split("").map((char, i) => (
              <span key={i} className="char inline-block whitespace-pre">{char}</span>
            ))}
          </p>

          <div ref={buttonRef} className="pt-4 flex justify-start">
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

        {/* SAĞ TARAF: Playlist Embed */}
        <div ref={spotifyRef} className="lg:col-span-7 w-full h-[500px] md:h-[650px] shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
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
