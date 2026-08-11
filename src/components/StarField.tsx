import { useMemo } from 'react';

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function StarField() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 90 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/night-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-indigo-950/70 to-slate-950/90" />
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-amber-100 animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: '0 0 6px rgba(253, 230, 138, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
