import React, { useRef, useEffect } from 'react';

export const HeroInteractiveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement?.clientWidth ? canvas.parentElement.clientWidth * dpr : window.innerWidth * dpr;
      canvas.height = canvas.parentElement?.clientHeight ? canvas.parentElement.clientHeight * dpr : 520 * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Continuous Wave Mesh Simulation (No fade in / fade out)
    const render = () => {
      time += 0.015;

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Draw subtle dynamic ambient fluid energy lines across gradient
      const lines = 6;
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const yOffset = (height * 0.4) + (i * 18);
        const freq = 0.003 + (i * 0.0006);
        const amp = 14 + (i * 4) + (mouseRef.current.y * 10);
        const speed = time * (0.8 + (i * 0.2));

        ctx.moveTo(0, yOffset);
        for (let x = 0; x <= width; x += 12) {
          const wave1 = Math.sin(x * freq + speed) * amp;
          const wave2 = Math.cos(x * 0.0015 - speed * 0.7) * (amp * 0.5);
          const mouseDist = Math.hypot(x - mouseRef.current.x * width, yOffset - mouseRef.current.y * height);
          const mouseInfluence = Math.max(0, 1 - mouseDist / 250) * 16;
          
          ctx.lineTo(x, yOffset + wave1 + wave2 + (Math.sin(time * 2) * mouseInfluence));
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + (i * 0.02)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      
      {/* 1. Underlying animated rich warm gradient image */}
      <div 
        className="absolute -inset-8 bg-cover bg-center animate-gradient-drift transform-gpu"
        style={{
          backgroundImage: `url(/Gradient.png)`,
          backgroundSize: '115% 115%',
          backgroundPosition: 'center',
          filter: 'contrast(1.05) saturate(1.15)',
        }}
      />

      {/* 2. Mathematical / Monospace Grid Texture on top */}
      <div 
        className="absolute -inset-8 bg-repeat bg-center animate-texture-shift mix-blend-overlay transform-gpu"
        style={{
          backgroundImage: `url(/texture.png)`,
          backgroundSize: '650px 650px',
          opacity: 0.85,
        }}
      />

      {/* 3. Kinetic Canvas Particle Wave Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none"
      />

      {/* 4. Soft bottom gradient vignette for smooth transition into #FDFDFD */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/60 to-transparent" 
      />
    </div>
  );
};
