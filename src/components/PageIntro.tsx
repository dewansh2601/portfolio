'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const INTRO_KEY = 'portfolio_intro_seen';

export default function PageIntro() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    if (!seen) {
      setShowIntro(true);
      sessionStorage.setItem(INTRO_KEY, '1');
    }
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    const timer = window.setTimeout(() => setShowIntro(false), 2000);
    return () => window.clearTimeout(timer);
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: '#030303',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'left' }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
              color: 'rgba(34,197,94,0.7)', letterSpacing: '0.2em',
              marginBottom: '0.75rem',
            }}>
              $ initializing portfolio...
            </p>
            <h1 style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
            }}>
              Dewansh Mishra
            </h1>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem',
            }}>
              DevOps &amp; Cloud Engineer
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
