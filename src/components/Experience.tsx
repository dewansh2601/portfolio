'use client';

// ============================================
// Experience Component
// Features: Full-width card, fade/slide animations,
// achievement bullets, and technology tags
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '@/data';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      className="story-section py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Ambient glass orbs */}
      <div className="glass-orb" style={{ width: 400, height: 400, top: '10%', left: '-12%', background: 'radial-gradient(circle, rgba(34,197,94,0.09) 0%, transparent 70%)' }} />
      <div className="glass-orb" style={{ width: 280, height: 280, bottom: '5%', right: '-8%', background: 'radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <AnimatedHeading text="Work Experience" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey in DevOps and cloud engineering.
          </p>
        </motion.div>

        {/* Experience items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              experience={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Individual Experience Item Component
interface ExperienceItemProps {
  experience: typeof experiences[0];
  index: number;
  isInView: boolean;
}

const ExperienceItem = ({ experience, index, isInView }: ExperienceItemProps) => {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Content card */}
      <div className="glass-card p-6 md:p-8 hover:border-neon-blue/30 transition-all duration-300 group">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-neon-blue text-sm font-mono mb-2">
            <FaCalendarAlt className="w-3 h-3" />
            {experience.period}
          </div>
          <h3 className="font-display text-2xl font-semibold text-white group-hover:text-neon-blue transition-colors">
            {experience.title}
          </h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <FaBriefcase className="w-3.5 h-3.5 text-neon-purple" />
              {experience.company}
            </span>
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="w-3.5 h-3.5" />
              {experience.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-[15px] mb-6 leading-relaxed">
          {experience.description}
        </p>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-[15px] font-semibold text-gray-300 mb-3">Key Achievements:</h4>
          <ul className="space-y-3">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2 + i * 0.1 + 0.3 }}
                className="text-[14px] text-gray-400 flex items-start gap-3"
              >
                <span className="text-neon-blue mt-1 shrink-0">▹</span>
                <span className="leading-relaxed">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
