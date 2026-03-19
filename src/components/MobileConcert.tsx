import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { concertData } from '../data/concert';

interface MobileConcertProps {
  active: boolean;
}

const MobileConcert: React.FC<MobileConcertProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    if (active) {
      gsap.fromTo(
        '.concert-content-mobile',
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 }
      );
    } else {
      gsap.set('.concert-content-mobile', { opacity: 0, y: 30, scale: 0.98 });
    }
  }, { dependencies: [active], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full bg-white flex flex-col items-center justify-center p-4">
      <div className="concert-content-mobile text-center mb-6 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{t('concert.title')}</h2>
        <p className="text-sm text-gray-500 uppercase tracking-wider">{t('concert.subtitle')}</p>
      </div>
      
      <div className="concert-content-mobile w-full aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-100">
        <iframe
          src={`https://www.youtube.com/embed/${concertData.embedId}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
          title={`${t('concert.title')} - YouTube Video`}
          loading="lazy"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MobileConcert;
