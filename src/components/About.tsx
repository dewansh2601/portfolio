'use client';

// ============================================
// About Section Component
// Features: Animated bio card, journey timeline,
// and scroll-triggered animations
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '@/data';
import { FaMapMarkerAlt, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import AnimatedTerminal from './AnimatedTerminal';
import dynamic from 'next/dynamic';

const HolographicTerminal = dynamic(() => import('./HolographicTerminal'), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const ref = useRef(null);
  const bioCardRef = useRef(null);
  const journeyRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // GSAP Parallax effects
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on bio card
      if (bioCardRef.current) {
        gsap.fromTo(
          bioCardRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: bioCardRef.current,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            },
          }
        );
      }

      // Parallax effect on journey timeline
      if (journeyRef.current) {
        gsap.fromTo(
          journeyRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: journeyRef.current,
              start: 'top bottom-=100',
              end: 'top center',
              scrub: 1,
            },
          }
        );
      }

      // Animate journey items
      gsap.utils.toArray('.journey-item').forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=50',
              end: 'top center',
              scrub: 1,
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const journeyVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neon-purple/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know more about my background, journey, and what drives me as a DevOps engineer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Bio Card */}
          <motion.div
            ref={bioCardRef}
            variants={cardVariants}
            className="glass-card p-6 md:p-8 relative overflow-hidden group"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              {/* Profile header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-2xl font-display font-bold">
                  DM
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {aboutData.name}
                  </h3>
                  <p className="text-neon-blue text-sm">{aboutData.title}</p>
                </div>
              </div>

              {/* Bio text */}
              <p className="text-gray-300 leading-relaxed mb-6">
                {aboutData.bio}
              </p>

              {/* Quick info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <FaMapMarkerAlt className="text-neon-blue" />
                  <span>{aboutData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <FaEnvelope className="text-neon-purple" />
                  <a
                    href={`mailto:${aboutData.email}`}
                    className="hover:text-neon-blue transition-colors"
                  >
                    {aboutData.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Timeline */}
          <motion.div ref={journeyRef} variants={cardVariants} className="space-y-6">
            <h3 className="font-display text-2xl font-semibold text-white flex items-center gap-3">
              <FaGraduationCap className="text-neon-blue" />
              My Journey
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

              {/* Journey items */}
              <div className="space-y-6">
                {aboutData.journey.map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={journeyVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="journey-item relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-dark-800 border-2 border-neon-blue flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-neon-blue" />
                    </div>

                    {/* Content card */}
                    <div className="glass-card p-4 hover:border-neon-blue/30 transition-colors duration-300">
                      <span className="text-xs text-neon-blue font-mono">
                        {item.period}
                      </span>
                      <h4 className="font-semibold text-white mt-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neon-purple mt-0.5">
                        {item.institution}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Holographic Terminal Section */}
        <div className="mt-20 mb-8">
          <HolographicTerminal />
        </div>
      </div>
    </section>
  );
};

export default About;
