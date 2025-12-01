'use client';

// ============================================
// Mouse Tracker 3D Component
// Interactive 3D effect that follows mouse movement
// ============================================

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseTracker3D = () => {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { damping: 30, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Update cursor position
      mouseX.set(clientX - 100);
      mouseY.set(clientY - 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Glowing cursor follower - NO BLUR for text clarity */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 50%, transparent 70%)',
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* 3D perspective effect on main content */}
      <style jsx global>{`
        .mouse-3d-container {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default MouseTracker3D;
