'use client';

// ============================================
// Hero Section Component
// Features: Animated text reveal, floating tech icons,
// gradient background, and CTA buttons
// ============================================

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import {
  FaAws, FaDocker, FaLinux, FaPython, FaGithub
} from 'react-icons/fa';
import {
  SiKubernetes, SiTerraform, SiJenkins
} from 'react-icons/si';
import { aboutData } from '@/data';

// Lazy load FloatingCodeSnippets after initial render for better LCP
const FloatingCodeSnippets = dynamic(() => import('./FloatingCodeSnippets'), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for floating icons
const iconComponents: { [key: string]: React.ElementType } = {
  FaAws,
  FaDocker,
  SiKubernetes,
  FaLinux,
  SiTerraform,
  SiJenkins,
  FaPython,
};

// Optimized floating icon data - reduced from 7 to 5 for better performance
const floatingIconsData = [
  { Icon: FaAws, position: 'top-[15%] left-[10%]', delay: 0, color: 'text-orange-400' },
  { Icon: FaDocker, position: 'top-[20%] right-[15%]', delay: 0.5, color: 'text-blue-400' },
  { Icon: SiKubernetes, position: 'bottom-[35%] left-[8%]', delay: 1, color: 'text-blue-500' },
  { Icon: SiTerraform, position: 'bottom-[25%] right-[18%]', delay: 1.5, color: 'text-purple-400' },
  { Icon: FaPython, position: 'top-[65%] left-[12%]', delay: 2, color: 'text-yellow-300' },
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const codeSnippetsRef = useRef<HTMLDivElement>(null);

  // Optimized GSAP Parallax effects
  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Optimized parallax effect on hero content
      gsap.to(contentRef.current, {
        y: 150,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5, // Reduced for better performance
        },
      });

      // Keep code snippets visible until very end of hero section
      if (codeSnippetsRef.current) {
        gsap.to(codeSnippetsRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Batch animate floating icons for better performance
      const icons = gsap.utils.toArray('.floating-icon');
      if (icons.length > 0) {
        gsap.to(icons, {
          y: '+=100',
          rotation: '+=10',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Smooth scroll to next section
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Simplified floating animation for better performance
  const floatVariants = {
    animate: (delay: number) => ({
      y: [0, -15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
        delay,
      },
    }),
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden particle-bg"
    >
      {/* Floating Code Snippets */}
      <div ref={codeSnippetsRef} className="absolute inset-0 pointer-events-none z-0">
        <FloatingCodeSnippets />
      </div>

      {/* Optimized gradient orbs - reduced from 3 to 2 for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl will-change-transform"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 2,
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl will-change-transform"
        />
      </div>

      {/* Floating Tech Icons */}
      {floatingIconsData.map(({ Icon, position, delay, color }, index) => (
        <motion.div
          key={index}
          custom={delay}
          variants={floatVariants}
          animate="animate"
          className={`floating-icon absolute ${position} ${color} opacity-20 hidden md:block`}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-neon-blue font-mono text-sm md:text-base mb-4 tracking-wider"
        >
          {'<Hello World />'}
        </motion.p>

        {/* Name with gradient */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          I'm{' '}
          <span className="text-gradient">
            {aboutData.name}
          </span>
        </motion.h1>

        {/* Title with Typing Animation */}
        <motion.div
          variants={itemVariants}
          className="font-display text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6"
        >
          <TypeAnimation
            sequence={[
              'DevOps & Cloud Engineer',
              2000,
              'AWS Solutions Architect',
              2000,
              'Infrastructure Automation Expert',
              2000,
              'CI/CD Pipeline Specialist',
              2000,
            ]}
            wrapper="h2"
            speed={50}
            repeat={Infinity}
            className="text-gradient"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Building scalable cloud infrastructure and automating deployments 
          with modern DevOps practices. Passionate about CI/CD, containers, 
          and infrastructure as code.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href={aboutData.resumeUrl}
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download Resume
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Me
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.button
            onClick={scrollToNextSection}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center text-gray-500 hover:text-neon-blue transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Scroll to next section"
          >
            <span className="text-xs mb-2">Scroll Down</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
