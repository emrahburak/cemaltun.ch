import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const HeroContent = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation();
  const name = "CEM ALTUN";

  return (
    <div ref={ref} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white pointer-events-none">
      <div className="space-y-6 md:space-y-8 px-4">

        {/* Subtext Sınıfı Eklendi */}
        <p className="hero-subtext font-manrope text-lg md:text-xs tracking-[0.8em] uppercase font-semibold">
          {t('hero.official_website')}
        </p>

        <h1
          className="font-bodoni-moda text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase flex overflow-hidden"
          style={{ perspective: "1000px" }} // 3D dönüşün derinliğini artırır
        >
          {name.split("").map((char, index) => (
            <span
              key={index}
              className="char inline-block origin-bottom"
              style={{
                whiteSpace: char === " " ? "pre" : "normal",
                display: "inline-block"
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtext Sınıfı Eklendi */}
        <div className="hero-subtext flex items-center justify-center gap-4 md:gap-8 font-urbanist text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold">
          <span>{t('hero.composer')}</span>
          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          <span>{t('hero.zurich')}</span>
        </div>

      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";
export default HeroContent;
