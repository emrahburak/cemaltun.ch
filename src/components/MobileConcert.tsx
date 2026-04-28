import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ConcertCardStack from './ConcertCardStack';
import { concertVideos } from '../data/concert';

interface MobileConcertProps {
  active: boolean;
}

const MobileConcert: React.FC<MobileConcertProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (active) {
      gsap.fromTo(
        '.concert-stack-wrapper-mobile',
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    } else {
      gsap.set('.concert-stack-wrapper-mobile', { opacity: 0, y: 30, scale: 0.98 });
    }
  }, { dependencies: [active], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="concert-stack-wrapper-mobile w-full h-full">
        <ConcertCardStack videos={concertVideos} isMobile={true} />
      </div>
    </div>
  );
};

export default MobileConcert;
