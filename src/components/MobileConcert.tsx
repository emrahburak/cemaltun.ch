import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ConcertCardStack from './ConcertCardStack';
import { concertVideos } from '../data/concert';

interface MobileConcertProps {
  active: boolean;
}

const MobileConcert: React.FC<MobileConcertProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [framerActive, setFramerActive] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      '.concert-wrapper-mobile',
      { opacity: 0, y: 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
    );

    tl.fromTo(
      '.concert-title',
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      '.concert-video',
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1, ease: "expo.out" },
      "-=0.5"
    );

    tl.fromTo(
      '.concert-description',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      '.concert-controls',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      "-=0.3"
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
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="concert-wrapper-mobile w-full h-full">
        <ConcertCardStack
          videos={concertVideos}
          isMobile={true}
          framerActive={framerActive}
        />
      </div>
    </div>
  );
};

export default MobileConcert;
