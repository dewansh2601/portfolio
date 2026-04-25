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
import { FaMapMarkerAlt, FaEnvelope, FaGraduationCap, FaTerminal } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';

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
      className="story-section py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Ambient glass orbs */}
      <div className="glass-orb" style={{ width: 400, height: 400, top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
      <div className="glass-orb" style={{ width: 300, height: 300, bottom: '5%', right: '-5%', background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedHeading text="About Me" />
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
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-neon-blue" style={{ background: 'rgba(34,197,94,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '2px solid rgba(34,197,94,0.3)', boxShadow: '0 0 20px rgba(34,197,94,0.15), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                  <FaTerminal className="w-7 h-7" />
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
                    <div className="absolute left-[-2px] top-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(10,18,12,0.8)', backdropFilter: 'blur(8px)', border: '2px solid rgba(34,197,94,0.5)', boxShadow: '0 0 12px rgba(34,197,94,0.3)' }}>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.9)' }} />
                    </div>

                    {/* Content card */}
                    <div className="glass-card p-4 hover:border-neon-blue/30 transition-colors duration-300">
                      <span className="text-xs text-neon-blue font-bold font-mono">
                        {item.period}
                      </span>
                      <h4 className="font-medium text-white mt-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neon-purple mt-0.5">
                        {item.institution}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
