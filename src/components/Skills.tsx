'use client';

// ============================================
// Skills Section Component
// Features: Animated skill badges with icons,
// categorized display, and proficiency indicators
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import { skills } from '@/data';
import { SkillCategory } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const DevOpsCube = dynamic(() => import('./DevOpsCube'), {
  ssr: false,
  loading: () => null,
});

// Import icons
import {
  FaAws, FaDocker, FaLinux, FaPython, FaGitAlt, FaShieldAlt
} from 'react-icons/fa';
import {
  SiKubernetes, SiTerraform, SiJenkins, SiGithubactions,
  SiGitlab, SiGnubash, SiYaml, SiOwasp
} from 'react-icons/si';

// Icon mapping
const iconComponents: { [key: string]: React.ElementType } = {
  FaAws,
  FaDocker,
  FaLinux,
  FaPython,
  FaGitAlt,
  FaShieldAlt,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiGithubactions,
  SiGitlab,
  SiGnubash,
  SiYaml,
  SiOwasp,
};

// Category colors
const categoryColors: { [key in SkillCategory]: string } = {
  'Cloud & Infrastructure': 'from-orange-400 to-orange-600',
  'Containerization & Orchestration': 'from-blue-400 to-blue-600',
  'CI/CD & Automation': 'from-green-400 to-green-600',
  'Programming & Scripting': 'from-yellow-400 to-yellow-600',
  'Security & Monitoring': 'from-red-400 to-red-600',
};

const Skills = () => {
  const ref = useRef(null);
  const cubeRef = useRef(null);
  const cubeContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cubeContainerRef.current) return;
    const rect = cubeContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Optimized GSAP Parallax effects - reduced scrub for better performance
  useEffect(() => {
    if (!ref.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Simplified parallax effect on DevOps cube
      if (cubeRef.current) {
        gsap.fromTo(
          cubeRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: cubeRef.current,
              start: 'top bottom',
              end: 'center center',
              scrub: 0.5, // Reduced scrub value for better performance
            },
          }
        );
      }

      // Batch animate skill categories for performance
      const categories = gsap.utils.toArray('.skill-category');
      if (categories.length > 0) {
        gsap.fromTo(
          categories,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top center',
              end: 'center center',
              scrub: 0.5,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category]!.push(skill);
    return acc;
  }, {} as { [key in SkillCategory]?: typeof skills });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Tools and technologies I use to build robust, scalable, and secure cloud infrastructure.
          </p>

          {/* 3D DevOps Cube */}
          <motion.div
            ref={cubeContainerRef}
            onMouseMove={handleMouseMove}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
            }}
            className="relative mb-12 transition-transform duration-200 ease-out"
          >
            {/* Mouse tracking glow */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-neon-blue/10 blur-3xl pointer-events-none"
              animate={{
                x: cursorPosition.x - 192,
                y: cursorPosition.y - 192,
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            />

            <div ref={cubeRef}>
              <DevOpsCube />
            </div>
          </motion.div>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {(Object.entries(skillsByCategory) as [SkillCategory, typeof skills][]).map(
            ([category, categorySkills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                className="skill-category"
              >
                {/* Category title */}
                <h3 className="font-display text-lg font-semibold text-gray-300 mb-4 flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
                  {category}
                </h3>

                {/* Skills grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                >
                  {categorySkills?.map((skill, index) => {
                    const IconComponent = iconComponents[skill.icon];
                    
                    return (
                      <motion.div
                        key={skill.name}
                        variants={badgeVariants}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        className="skill-badge group cursor-pointer relative overflow-hidden"
                      >
                        {/* Animated background glow on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />

                        <div className="relative z-10 flex flex-col items-center justify-center">
                          {/* Icon with puls animation on hover */}
                          {IconComponent && (
                            <motion.div
                              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-neon-blue transition-colors mb-2" />
                            </motion.div>
                          )}

                          {/* Skill name */}
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                            {skill.name}
                          </span>

                          {/* Proficiency percentage shown on hover */}
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            whileHover={{ opacity: 1, height: 'auto' }}
                            className="text-xs text-neon-purple mt-1 font-mono"
                          >
                            {skill.proficiency}%
                          </motion.span>
                        </div>

                        {/* Proficiency indicator (animated bar) - optimized */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark-600 rounded-b-2xl overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.proficiency}%` } : {}}
                            transition={{ delay: 0.3 + index * 0.05, duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )
          )}
        </div>

        {/* Additional decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            ...and always learning new technologies to stay current with industry trends
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
