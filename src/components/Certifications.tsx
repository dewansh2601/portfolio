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
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Certifications</h2>
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
              className="glass-card p-6 w-full sm:w-80 text-center group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badge image */}
              <div className="relative z-10 mb-4 flex justify-center">
                <div className="w-32 h-32 relative">
                  {cert.imageUrl ? (
                    <Image
                      src={cert.imageUrl}
                      alt={cert.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                      <FaAward className="w-16 h-16 text-neon-blue" />
                    </div>
                  )}
                </div>
              </div>

              {/* Certification info */}
              <div className="relative z-10">
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-neon-blue transition-colors mb-1">
                  {cert.name}
                </h3>
                <p className="text-sm text-neon-purple mb-1">{cert.issuer}</p>
                <p className="text-xs text-gray-400 mb-4">{cert.date}</p>

                {/* Action buttons */}
                <div className="flex justify-center gap-3">
                  {cert.credlyBadgeUrl && (
                    <a
                      href={cert.credlyBadgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-neon-blue transition-colors"
                    >
                      <FaCertificate className="w-3 h-3" />
                      <span>Credly</span>
                    </a>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-gray-400 hover:text-neon-purple transition-colors"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Corner ribbon */}
              <div className="absolute -top-1 -right-1 w-20 h-20 overflow-hidden">
                <div className="absolute top-3 right-[-35px] w-[120px] text-center text-[10px] font-bold text-dark-900 bg-neon-blue py-1 rotate-45">
                  VERIFIED
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500">
            Currently pursuing additional AWS certifications to expand cloud expertise
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
