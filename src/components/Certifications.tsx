'use client';

// ============================================
// Certifications Section Component
// Features: Scrollable carousel of certification badges,
// hover effects, and verification links
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { certifications } from '@/data';
import { FaCertificate, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import Image from 'next/image';
import AnimatedHeading from './AnimatedHeading';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="certifications"
      className="story-section py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Ambient glass orbs */}
      <div className="glass-orb" style={{ width: 380, height: 380, top: '-5%', right: '-10%', background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)' }} />
      <div className="glass-orb" style={{ width: 260, height: 260, bottom: '10%', left: '-6%', background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedHeading text="Certifications" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications validating my cloud and DevOps expertise.
          </p>
        </motion.div>

        {/* Certifications Grid/Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="w-full sm:w-80 text-center group relative overflow-hidden"
              style={{
                background: 'rgba(10, 18, 12, 0.58)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset',
                padding: '1.75rem 1.5rem 1.5rem',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(34,197,94,0.4)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(34,197,94,0.15), 0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(34,197,94,0.15)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset';
              }}
            >
              {/* Hover glow — green */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(34,197,94,0.10) 0%, transparent 70%)', borderRadius: '20px' }} />

              {/* HUD Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <motion.div
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/15 to-transparent"
                  animate={{ y: [0, 320] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* HUD Corner Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 -translate-y-1" style={{ borderColor: 'rgba(34,197,94,0.6)' }} />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 -translate-y-1" style={{ borderColor: 'rgba(34,197,94,0.6)' }} />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 translate-y-1" style={{ borderColor: 'rgba(34,197,94,0.6)' }} />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 translate-y-1" style={{ borderColor: 'rgba(34,197,94,0.6)' }} />

              {/* Badge image */}
              <div className="relative z-10 mb-4 flex justify-center">
                <div className="w-32 h-32 relative">
                  {cert.imageUrl ? (
                    <Image
                      src={cert.imageUrl}
                      alt={`${cert.name} certification badge from ${cert.issuer}`}
                      fill
                      className="object-contain"
                      unoptimized
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center border border-green-500/20">
                      <FaAward className="w-16 h-16" style={{ color: '#22c55e' }} aria-label="Certification award icon" />
                    </div>
                  )}
                </div>
              </div>

              {/* Certification info */}
              <div className="relative z-10">
                <h3
                  className="font-display text-lg font-semibold mb-1 transition-colors duration-300"
                  style={{ color: 'rgba(255,255,255,0.92)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22c55e'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.92)'}
                >
                  {cert.name}
                </h3>
                <p className="text-sm mb-1 font-mono" style={{ color: '#4ade80' }}>{cert.issuer}</p>
                <p className="text-xs text-gray-400 mb-4">{cert.date}</p>

                {/* Action buttons */}
                <div className="flex justify-center gap-3">
                  {cert.credlyBadgeUrl && (
                    <a
                      href={cert.credlyBadgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${cert.name} certification on Credly`}
                      className="flex items-center gap-1 text-xs transition-colors duration-200"
                      style={{ color: 'rgba(156,163,175,1)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#22c55e'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(156,163,175,1)'}
                    >
                      <FaCertificate className="w-3 h-3" aria-hidden="true" />
                      <span>Credly</span>
                    </a>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.name} certification`}
                      className="flex items-center gap-1 text-xs transition-colors duration-200"
                      style={{ color: 'rgba(156,163,175,1)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#22c55e'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(156,163,175,1)'}
                    >
                      <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Corner ribbon */}
              <div className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden">
                {cert.date === 'In Progress' ? (
                  <div
                    className="absolute top-3 right-[-35px] w-[120px] text-center text-[9px] font-bold py-1.5 rotate-45 tracking-wider"
                    style={{ background: '#a855f7', color: '#fff', boxShadow: '0 2px 12px rgba(168,85,247,0.4)' }}
                  >
                    IN PROGRESS
                  </div>
                ) : (
                  <div
                    className="absolute top-3 right-[-35px] w-[120px] text-center text-[10px] font-bold py-1.5 rotate-45 tracking-wider"
                    style={{ background: '#22c55e', color: '#000', boxShadow: '0 2px 12px rgba(34,197,94,0.5)' }}
                  >
                    VERIFIED
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Certifications;
