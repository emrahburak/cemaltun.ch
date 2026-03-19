import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { concertData } from '../data/concert';

interface DesktopConcertProps {
  active: boolean;
}

const DesktopConcert: React.FC<DesktopConcertProps> = ({ active }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useGSAP(() => {
    if (active) {
      gsap.fromTo(
        '.concert-content',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.2 }
      );
    } else {
      gsap.set('.concert-content', { opacity: 0, y: 50, scale: 0.95 });
    }
  }, { dependencies: [active], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full bg-white flex flex-col items-center justify-center p-8">
      <div className="concert-content text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">{t('concert.title')}</h2>
        <p className="text-lg text-gray-500 uppercase tracking-widest">{t('concert.subtitle')}</p>
      </div>
      
      <div className="concert-content w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-100">
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

export default DesktopConcert;
