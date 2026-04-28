import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MobileVideosProps {
  active: boolean;
}

const MobileVideos = ({ active }: MobileVideosProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      containerRef.current.querySelectorAll(".videos-reveal"),
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      }
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
      className="w-full h-full flex items-center justify-center bg-white px-6 overflow-hidden"
    >
      <div className="max-w-full w-full">
        <div className="videos-reveal">
          <h2 className="text-[10px] font-manrope font-bold mb-4 tracking-[0.5em] uppercase opacity-40 text-black">
            Videos
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MobileVideos;
