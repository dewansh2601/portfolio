'use client';

// ============================================
// Hero Section — Terminal Theme
// Clean monospace layout inspired by terminal
// portfolios: status badge, typed role, links
// ============================================

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';
import { aboutData, socialLinks } from '@/data';

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
        padding: '7rem 1rem 4rem',
        position: 'relative',
      }}
    >
      <div
        style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}
      >
        <motion.div variants={container} initial="hidden" animate="visible">

          {/* Prompt line */}
          <motion.p variants={line} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.3)', marginBottom: '1.5rem',
          }}>
            ~ / portfolio <span style={{ color: 'rgba(34,197,94,0.8)' }}>$</span> whoami
          </motion.p>

          {/* Name */}
          <motion.h1 variants={line} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            {aboutData.name}
          </motion.h1>

          {/* Status badge */}
          <motion.div variants={line} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              border: '1px solid rgba(34,197,94,0.45)',
              borderRadius: '2px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: '#22c55e',
              backgroundColor: 'rgba(34,197,94,0.06)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                backgroundColor: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
                animation: 'termBlink 2s infinite',
                display: 'inline-block',
              }} />
              Open for roles
            </span>

            <a
              href={aboutData.resumeUrl}
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.25rem 0.75rem',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '2px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#22c55e'; (e.currentTarget as HTMLElement).style.color = '#22c55e'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              <FaFileAlt style={{ width: '0.75rem', height: '0.75rem' }} />
              View Resume
            </a>
          </motion.div>

          {/* Typing role */}
          <motion.div variants={line} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '1rem',
            lineHeight: 1.6,
          }}>
            <TypeAnimation
              sequence={[
                'DevOps & Cloud Engineer.',
                2200,
                'CI/CD Pipeline Specialist.',
                2200,
                'AWS Infrastructure Architect.',
                2200,
                'Infrastructure as Code Expert.',
                2200,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </motion.div>

          {/* Short bio line */}
          <motion.p variants={line} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.42)',
            marginBottom: '2rem',
            maxWidth: '560px',
            lineHeight: 1.75,
          }}>
            Building scalable cloud infrastructure and automating deployments
            {' '}with modern DevOps practices.{' '}
            <span style={{ color: 'rgba(34,197,94,0.7)' }}>Based in {aboutData.location}.</span>
          </motion.p>

          {/* Social icons — bordered squares */}
          <motion.div variants={line} style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ borderColor: '#22c55e', color: '#22c55e' }}
                  style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: '2px',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  {Icon && <Icon style={{ width: '1rem', height: '1rem' }} />}
                </motion.a>
              );
            })}

            {/* Contact CTA */}
            <motion.a
              href="#contact"
              whileHover={{ backgroundColor: '#16a34a' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0 1.25rem', height: '40px',
                backgroundColor: '#22c55e', color: '#000',
                border: '1px solid #22c55e', borderRadius: '2px',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.06em',
                transition: 'background-color 0.2s ease',
              }}
            >
              Get in touch →
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.p
            variants={line}
            style={{
              marginTop: '3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.08em',
            }}
          >
            scroll to explore ↓
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
