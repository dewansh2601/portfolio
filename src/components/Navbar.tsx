'use client';

// ============================================
// Navbar — Terminal Theme
// Pure dark with green accent, monospace font,
// bordered active indicator
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/data';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = navItems.map(item => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(section);
          document.documentElement.setAttribute('data-active-section', section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: isScrolled
          ? 'rgba(6, 12, 8, 0.75)'
          : 'transparent',
        borderBottom: isScrolled
          ? '1px solid rgba(34, 197, 94, 0.12)'
          : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(200%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(200%)' : 'none',
        boxShadow: isScrolled
          ? '0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.06), 0 1px 0 rgba(255,255,255,0.04) inset'
          : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ color: '#4ade80', textShadow: '0 0 12px rgba(74,222,128,0.6)' }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#22c55e',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              textShadow: '0 0 8px rgba(34,197,94,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            DM<span style={{ opacity: 0.5 }}>@devops</span><span style={{ animation: 'termBlink 1s infinite' }}>_</span>
          </motion.a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden md:flex">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    position: 'relative',
                    padding: '0.35rem 0.875rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#22c55e' : 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    borderRadius: '8px',
                  }}
                  className="hover:text-white"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      style={{
                        position: 'absolute', inset: 0,
                        border: '1px solid rgba(34,197,94,0.35)',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(34,197,94,0.08)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 0 16px rgba(34,197,94,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 35 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {isActive ? `[${item.label}]` : item.label}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(v => !v)}
            style={{
              padding: '0.4rem',
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.15)',
              borderRadius: '8px',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
            }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: 'rgba(6, 12, 8, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderBottom: '1px solid rgba(34,197,94,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      display: 'block', padding: '0.6rem 0.875rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                      color: isActive ? '#22c55e' : 'rgba(255,255,255,0.55)',
                      textDecoration: 'none',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(34,197,94,0.3)' : 'transparent',
                      backgroundColor: isActive ? 'rgba(34,197,94,0.08)' : 'transparent',
                      borderRadius: '8px',
                      backdropFilter: isActive ? 'blur(8px)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isActive ? `> ${item.label}` : `  ${item.label}`}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
