import { forwardRef } from "react";

interface HeroLoaderProps {
  spectrumRef: React.RefObject<HTMLDivElement | null>;
}

const HeroLoader = forwardRef<HTMLDivElement, HeroLoaderProps>(
  ({ spectrumRef }, ref) => {
    return (
      <>
        {/* BAŞLANGIÇ BEYAZLIĞI */}
        <div ref={ref} className="absolute inset-0 z-[60] bg-[#f5f5f5]" />

        {/* SPEKTRUM ÇİZGİSİ */}
        <div className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center px-10 md:px-40">
          <div
            ref={spectrumRef}
            className="h-[1px] bg-black/50 w-0 origin-center"
          />
        </div>
      </>
    );
  }
);

HeroLoader.displayName = "HeroLoader";
export default HeroLoader;
