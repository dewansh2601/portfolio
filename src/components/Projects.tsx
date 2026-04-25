'use client';

// ============================================
// Projects Section Component
// Features: Glassmorphism cards, hover tilt effect,
// tag badges, and GitHub links
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/data';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const featuredProjects = projects.filter((p) => p.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      id="projects"
      className="story-section py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Ambient glass orbs */}
      <div className="glass-orb" style={{ width: 350, height: 350, top: '20%', right: '-8%', background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)' }} />
      <div className="glass-orb" style={{ width: 250, height: 250, bottom: '10%', left: '-5%', background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedHeading text="Featured Projects" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in DevOps, automation, and cloud infrastructure.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variants={cardVariants}
              index={index}
            />
          ))}
        </motion.div>

        {/* View more projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/dewansh2601"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors group"
          >
            <FaGithub className="w-5 h-5" />
            <span>View all projects on GitHub</span>
            <FaExternalLinkAlt className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Individual Project Card Component with tilt effect
interface ProjectCardProps {
  project: typeof projects[0];
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number; ease: string } };
  };
  index: number;
}

const ProjectCard = ({ project, variants, index }: ProjectCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const colors = ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4'];
  const accentColor = colors[index % colors.length];

  return (
    <motion.div
      variants={variants}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        borderTop: `3px solid ${accentColor}`,
        borderRadius: '14px',
        background: 'rgba(10,18,12,0.55)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTop: `3px solid ${accentColor}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.55), 0 0 0 0px ${accentColor}22`,
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
      }}
      className="glass-card p-6 relative overflow-hidden group cursor-pointer transition-all duration-200"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(45deg, transparent, transparent)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Spotlight effect following mouse */}
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-neon-blue/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{
          x: rotateY * 10,
          y: rotateX * 10,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {/* Project title */}
        <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3" title={project.description}>
          {project.description}
        </p>

        {/* Tags with animations */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-2 py-1 text-xs font-mono bg-dark-600/50 border border-white/10 rounded text-gray-300 hover:border-neon-blue/50 hover:text-neon-blue transition-all cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-blue transition-colors"
            >
              <FaGithub className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-purple transition-colors"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-neon-blue/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default Projects;
