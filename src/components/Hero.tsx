'use client';

// ============================================
// Hero Section — Terminal Theme
// Clean monospace layout inspired by terminal
// portfolios: status badge, typed role, links
// ============================================

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaChevronDown } from 'react-icons/fa';
import { aboutData, socialLinks } from '@/data';
import dynamic from 'next/dynamic';

const HolographicTerminal = dynamic(() => import('./HolographicTerminal'), {
  ssr: false,
  loading: () => null,
});

const iconMap: Record<string, React.ElementType> = { FaGithub, FaLinkedin, FaEnvelope };

const Hero = () => {
  const ref = useRef<HTMLElement>(null);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const line = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '7rem 0 4rem',
        position: 'relative',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2">
          <motion.div variants={container} initial="hidden" animate="visible">
            
            {/* Status badge above name */}
            <motion.div variants={line} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#22c55e', backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 20px rgba(34,197,94,0.08), inset 0 1px 0 rgba(255,255,255,0.06)', marginBottom: '1.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'termBlink 2s infinite', display: 'inline-block' }} />
              Open for roles
            </motion.div>

            {/* Prompt line */}
            <motion.p variants={line} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.3)', marginBottom: '1rem',
            }}>
              ~ / portfolio <span style={{ color: 'rgba(34,197,94,0.8)' }}>$</span> whoami
            </motion.p>

            {/* Name */}
            <motion.h1 variants={line} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
              lineHeight: 1.1,
            }}>
              {aboutData.name}
            </motion.h1>

            {/* Typing role */}
            <motion.div variants={line} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}>
              <TypeAnimation
                sequence={[
                  'DevOps Engineer',
                  2200,
                  'Cloud Infrastructure',
                  2200,
                  'CI/CD Specialist',
                  2200,
                  'Infrastructure as Code',
                  2200,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </motion.div>

            {/* Short bio line */}
            <motion.p variants={line} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '2.5rem',
              maxWidth: '560px',
              lineHeight: 1.75,
            }}>
              Building scalable cloud infrastructure and automating deployments
              {' '}with modern DevOps practices.{' '}
              <span style={{ color: 'rgba(34,197,94,0.7)' }}>Based in {aboutData.location}.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={line} className="flex flex-wrap items-center gap-4 mb-6">
              {/* Primary CTA */}
              <a
                href={aboutData.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 h-[44px] font-mono text-sm font-bold no-underline transition-all"
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#000',
                  border: '1px solid rgba(34,197,94,0.6)',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px rgba(34,197,94,0.3), 0 1px 0 rgba(255,255,255,0.2) inset',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 30px rgba(34,197,94,0.5), 0 0 0 1px rgba(74,222,128,0.4)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(34,197,94,0.3), 0 1px 0 rgba(255,255,255,0.2) inset';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                <FaFileAlt className="w-4 h-4" />
                View Resume
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 h-[44px] font-mono text-sm font-medium no-underline transition-all"
                style={{
                  background: 'rgba(34,197,94,0.06)',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(34,197,94,0.22)',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(34,197,94,0.5)';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#22c55e';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(34,197,94,0.15), inset 0 1px 0 rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(34,197,94,0.22)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.8)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)';
                }}
              >
                Get in touch →
              </a>
            </motion.div>

            {/* Social icons — borderless */}
            <motion.div variants={line} className="flex gap-4 items-center">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    whileHover={{ scale: 1.1, color: '#22c55e' }}
                    className="text-gray-500 hover:text-neon-green transition-colors p-2 -ml-2"
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </motion.a>
                );
              })}
            </motion.div>

          </motion.div>
        </div>

        {/* Right Side: Visual Anchor (Terminal) */}
        <div className="w-full lg:w-1/2 hidden md:block">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <HolographicTerminal />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a 
          href="#about" 
          aria-label="Scroll down to About section"
          className="text-gray-500 opacity-60 hover:text-neon-blue hover:opacity-100 transition-all duration-300 block p-2"
        >
          <FaChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;

