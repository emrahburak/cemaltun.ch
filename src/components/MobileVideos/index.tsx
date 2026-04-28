import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConcertCardStack from "../ConcertCardStack";
import { concertVideos } from "../../data/concert";

interface MobileVideosProps {
  active: boolean;
}

const MobileVideos = ({ active }: MobileVideosProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [framerActive, setFramerActive] = useState(false);

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

    tl.call(() => setFramerActive(true));

    tlRef.current = tl;
  }, { scope: containerRef });

  useEffect(() => {
    if (active) {
      setFramerActive(false);
      tlRef.current?.restart();
    } else {
      tlRef.current?.reverse();
    }
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-white px-6 overflow-hidden"
    >
      <div className="videos-reveal max-w-full w-full h-full">
        <ConcertCardStack
          videos={concertVideos}
          isMobile={true}
          framerActive={framerActive}
        />
      </div>
    </div>
  );
};

export default MobileVideos;
