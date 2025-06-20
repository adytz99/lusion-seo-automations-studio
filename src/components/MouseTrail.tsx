
import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  id: number;
}

export const MouseTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newParticle: Particle = {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 8 + 4,
        id: particleIdRef.current++,
      };

      setParticles(prev => [...prev, newParticle].slice(-15));
    };

    // Animation loop for particle decay
    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            opacity: particle.opacity - 0.05,
            size: particle.size * 0.98,
          }))
          .filter(particle => particle.opacity > 0)
      );
    };

    const animationInterval = setInterval(animateParticles, 16);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] blur-sm"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: 'translate3d(0, 0, 0)',
          }}
        />
      ))}
    </div>
  );
};
