// src/components/Clock.tsx
import { useEffect, useRef } from 'react';
import './Clock.css';

const Clock = () => {
  // DOM elementlerini TS'e tanıtıyoruz
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const secondHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();

      const hoursDegrees = hours * 30 + (minutes / 60) * 30;
      const minutesDegrees = minutes * 6;
      // Smooth saniye hareketi
      const secondsDegrees = seconds * 6 + (milliseconds / 1000) * 6;

      // TS null check (?. kullanımı veya if bloğu)
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minutesDegrees}deg)`;
      }
      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondsDegrees}deg)`;
      }
    };

    const interval = setInterval(updateClock, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-clock-container scale-75 md:scale-100">
      <div className="glass-effect-wrapper">
        <div className="glass-effect-shadow"></div>
        <div className="glass-clock-face">
          <div className="glass-glossy-overlay"></div>
          <div className="glass-edge-highlight"></div>
          <div className="glass-edge-shadow"></div>
          <div className="glass-dark-edge"></div>
          <div className="glass-reflection"></div>

          <div className="clock-hour-marks">
            {[...Array(60)].map((_, i) => {
              if (i % 5 === 0) {
                const angle = (i * 6 * Math.PI) / 180;
                const radius = 145;
                const left = 175 + Math.sin(angle) * radius - 15;
                const top = 175 - Math.cos(angle) * radius - 10;
                return (
                  <div key={i} className="clock-number" style={{ left: `${left}px`, top: `${top}px` }}>
                    {i / 5 === 0 ? 12 : i / 5}
                  </div>
                );
              } else {
                return (
                  <div key={i} className="minute-marker" style={{ transform: `rotate(${i * 6}deg)` }}></div>
                );
              }
            })}
          </div>

          <div ref={hourHandRef} className="hour-hand clock-hand" id="hour-hand"></div>
          <div ref={minuteHandRef} className="minute-hand clock-hand" id="minute-hand"></div>

          <div ref={secondHandRef} className="second-hand-container" id="second-hand-container">
            <div className="second-hand"></div>
            <div className="second-hand-counterweight"></div>
          </div>

          <div className="clock-center-dot"></div>
          <div className="clock-center-blur"></div>

        </div>
      </div>
    </div>
  );
};

export default Clock;
