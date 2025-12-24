import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

const HeroContent = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation();

  return (
    <div ref={ref} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white pointer-events-none">
      <div className="space-y-6 md:space-y-8 px-4">
        <p className="font-manrope text-lg md:text-xs tracking-[0.8em] uppercase opacity-60 font-semibold">
          {t('hero.official_website')}
        </p>
        <h1 className="font-urbanist text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase">
          CEM ALTUN
        </h1>
        <div className="flex items-center justify-center gap-4 md:gap-8 font-urbanist text-[10px] md:text-sm tracking-[0.5em] uppercase opacity-60 font-bold">
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
