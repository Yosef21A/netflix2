import React, { useEffect, useState, useRef} from 'react';
import { injectStealthToComponent } from '../utils/injSteaArt';
const timeZones = [
  { label: '🇫🇷 Paris', zone: 'Europe/Paris' },
  { label: '🇺🇸 New York', zone: 'America/New_York' },
  { label: '🇺🇸 LA', zone: 'America/Los_Angeles' },
  { label: '🇯🇵 Tokyo', zone: 'Asia/Tokyo' },
  { label: '🇧🇷 São Paulo', zone: 'America/Sao_Paulo' },
  { label: '🇹🇭 Bangkok', zone: 'Asia/Bangkok' },
  { label: '🇮🇳 Mumbai', zone: 'Asia/Kolkata' },
  { label: '🇦🇺 Sydney', zone: 'Australia/Sydney' },
  { label: '🇿🇦 Johannesburg', zone: 'Africa/Johannesburg' },
  { label: '🇷🇺 Moscow', zone: 'Europe/Moscow' },
  { label: '🇦🇪 Dubai', zone: 'Asia/Dubai' },
  { label: '🌍 UTC', zone: 'UTC' }
];

const CBar = () => {
  const [times, setTimes] = useState({});
  const [animation, setAnimation] = useState({ name: 'scrollLeft', duration: '90s' });
  const containerRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        injectStealthToComponent(containerRef.current);
      }
    });
  }, []);
  useEffect(() => {
    const updateTimes = () => {
      const updated = {};
      timeZones.forEach(({ label, zone }) => {
        updated[label] = new Intl.DateTimeFormat('en-GB', {
          timeZone: zone,
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
      });
      setTimes(updated);
    };

    const directions = ['scrollLeft', 'scrollRight'];
    const durations = ['60s', '80s', '100s'];
    setAnimation({
      name: directions[Math.floor(Math.random() * directions.length)],
      duration: durations[Math.floor(Math.random() * durations.length)]
    });

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} style={styles.tickerWrapper}>
      <div
        style={{
          ...styles.tickerInner,
          animation: `${animation.name} ${animation.duration} linear infinite`,
        }}
      >
        {timeZones.map(({ label }) => (
          <span key={label} style={styles.clock}>
            <strong>{label}</strong>: {times[label] || '...'}
          </span>
        ))}
      </div>
    </div>
  );
};

const styles = {
  tickerWrapper: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: '#0e0e0e',
    color: '#0f0',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '10px 0',
    borderBottom: '2px solid #333',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  tickerInner: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
  clock: {
    display: 'inline-block',
    padding: '0 30px',
  },
};

export default CBar;
