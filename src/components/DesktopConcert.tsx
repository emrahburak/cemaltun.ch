import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ConcertCardStack from './ConcertCardStack';
import { concertVideos } from '../data/concert';

interface DesktopConcertProps {
  active: boolean;
}

const DesktopConcert: React.FC<DesktopConcertProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (active) {
      gsap.fromTo(
        '.concert-stack-wrapper',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    } else {
      gsap.set('.concert-stack-wrapper', { opacity: 0, y: 50, scale: 0.95 });
    }
  }, { dependencies: [active], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="concert-stack-wrapper w-full h-full">
        <ConcertCardStack videos={concertVideos} isMobile={false} />
      </div>
    </div>
  );
};

export default DesktopConcert;
