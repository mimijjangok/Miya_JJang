import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ViewportIndicator = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setScrollPercent(Math.round(percent));
    };

    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 right-8 z-[9998] hidden lg:flex flex-col items-end gap-1 font-black text-[8px] tracking-[0.2em] uppercase mix-blend-difference text-black pointer-events-none"
    >
      <div className="flex items-center gap-2">
        <span className="opacity-40">RES:</span>
        <span>{viewport.w} × {viewport.h}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="opacity-40">POS:</span>
        <div className="w-24 h-[1px] bg-black/20 relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-black"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
        <span className="w-6 text-right">{scrollPercent}%</span>
      </div>
      <div className="mt-1 flex items-center gap-1">
        <div className="w-1 h-1 bg-black animate-pulse" />
        <span className="opacity-40">RENDER_STABLE</span>
      </div>
    </motion.div>
  );
};
