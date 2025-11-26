'use client';

// ============================================
// Experience Timeline Component
// Features: Vertical timeline, fade/slide animations,
// achievement bullets, and technology tags
// ============================================

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { experiences } from '@/data';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/3 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Work Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My professional journey in DevOps and cloud engineering.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-6 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink transform md:-translate-x-1/2"
          />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.id}
                experience={exp}
                index={index}
                isInView={isInView}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
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
  isEven: boolean;
}

const ExperienceItem = ({ experience, index, isInView, isEven }: ExperienceItemProps) => {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
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
      className={`relative flex flex-col md:flex-row ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
          className="w-4 h-4 rounded-full bg-dark-900 border-2 border-neon-blue flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-neon-blue" />
        </motion.div>
      </div>

      {/* Content card */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="glass-card p-6 hover:border-neon-blue/30 transition-all duration-300 group">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-neon-blue text-sm font-mono mb-2">
              <FaCalendarAlt className="w-3 h-3" />
              {experience.period}
            </div>
            <h3 className="font-display text-xl font-semibold text-white group-hover:text-neon-blue transition-colors">
              {experience.title}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <FaBriefcase className="w-3 h-3 text-neon-purple" />
                {experience.company}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="w-3 h-3" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Achievements:</h4>
            <ul className="space-y-2">
              {experience.achievements.slice(0, 4).map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + i * 0.1 + 0.5 }}
                  className="text-xs text-gray-400 flex items-start gap-2"
                >
                  <span className="text-neon-blue mt-1">▹</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-neon-blue/10 border border-neon-blue/30 rounded text-neon-blue"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Empty spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
};

export default Experience;
