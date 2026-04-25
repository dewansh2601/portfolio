'use client';

// ============================================
// Tech Arsenal — Skills Showcase
// Liquid glass bubble icons, animated liquid-fill
// proficiency bars, accordion categories
// ============================================

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  level: 'daily-driver' | 'production' | 'regular' | 'learning';
  color: string;
}

const levelConfig = {
  'daily-driver': { label: 'Daily Driver',    bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  text: '#22c55e' },
  'production':   { label: 'Production Use',  bg: 'rgba(0,212,255,0.10)',  border: 'rgba(0,212,255,0.3)',   text: '#00d4ff' },
  'regular':      { label: 'Regular Use',     bg: 'rgba(168,85,247,0.10)', border: 'rgba(168,85,247,0.3)',  text: '#a855f7' },
  'learning':     { label: 'Learning',        bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.3)',   text: '#eab308' },
};

interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  glowColor: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: 'code',
    label: 'Pipeline Stage: Code',
    icon: '💻',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.4)',
    skills: [
      { name: 'Git', icon: '🌿', level: 'daily-driver', color: '#f05033' },
      { name: 'Python', icon: '🐍', level: 'production', color: '#ffd43b' },
      { name: 'Bash Scripting', icon: '💻', level: 'production', color: '#4ade80' },
      { name: 'YAML', icon: '📄', level: 'daily-driver', color: '#cb3837' },
    ],
  },
  {
    id: 'build',
    label: 'Pipeline Stage: Build',
    icon: '🏗️',
    color: '#2496ED',
    glowColor: 'rgba(36,150,237,0.4)',
    skills: [
      { name: 'Docker', icon: '🐳', level: 'daily-driver', color: '#2496ED' },
      { name: 'Terraform', icon: '🟣', level: 'production', color: '#7B42BC' },
      { name: 'AWS ECR', icon: '📦', level: 'production', color: '#ff9900' },
      { name: 'Helm', icon: '⛵', level: 'regular', color: '#0F1689' },
    ],
  },
  {
    id: 'scan',
    label: 'Pipeline Stage: Scan',
    icon: '🛡️',
    color: '#ef4444',
    glowColor: 'rgba(239,68,68,0.4)',
    skills: [
      { name: 'Trivy', icon: '🛡️', level: 'production', color: '#00b4d8' },
      { name: 'OWASP ZAP', icon: '🕷️', level: 'production', color: '#ef4444' },
      { name: 'SonarQube', icon: '🌊', level: 'regular', color: '#4c9ae8' },
      { name: 'Gitleaks', icon: '💧', level: 'production', color: '#8b5cf6' },
    ],
  },
  {
    id: 'deploy',
    label: 'Pipeline Stage: Deploy',
    icon: '🚀',
    color: '#00d4ff',
    glowColor: 'rgba(0,212,255,0.4)',
    skills: [
      { name: 'Kubernetes', icon: '⎈', level: 'production', color: '#326CE5' },
      { name: 'GitHub Actions', icon: '🐙', level: 'daily-driver', color: '#00d4ff' },
      { name: 'Jenkins', icon: '🤵', level: 'regular', color: '#d33833' },
      { name: 'GitLab CI', icon: '🦊', level: 'regular', color: '#fc6d26' },
    ],
  },
  {
    id: 'monitor',
    label: 'Pipeline Stage: Monitor',
    icon: '📊',
    color: '#ff9900',
    glowColor: 'rgba(255,153,0,0.4)',
    skills: [
      { name: 'AWS', icon: '🟠', level: 'daily-driver', color: '#ff9900' },
      { name: 'Linux', icon: '🐧', level: 'daily-driver', color: '#fde047' },
      { name: 'CloudWatch', icon: '📊', level: 'production', color: '#ff9900' },
      { name: 'Grafana', icon: '📈', level: 'regular', color: '#f97316' },
    ],
  },
];

// Individual skill row with experience level badge
const SkillRow = ({ skill, isVisible, delay }: { skill: Skill; isVisible: boolean; delay: number }) => {
  const cfg = levelConfig[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4 }}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '0.875rem',
        padding: '0.55rem 0.75rem',
        borderRadius: '0.6rem',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1rem' }}>{skill.icon}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(229,231,235,1)' }}>
          {skill.name}
        </span>
      </div>
      <span style={{
        fontSize: '0.68rem',
        fontFamily: 'var(--font-mono)',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        letterSpacing: '0.04em',
        flexShrink: 0,
      }}>
        {cfg.label}
      </span>
    </motion.div>
  );
};

const TechArsenal = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [openCategory, setOpenCategory] = useState<string>('code');
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const activeCat = categories.find(c => c.id === openCategory)!;

  return (
    <section
      id="techarsenal"
      ref={ref}
      className="story-section py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '50%',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '0.75rem',
            padding: '0.25rem 0.75rem',
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: '999px',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a855f7', letterSpacing: '0.15em' }}>
              SKILLS
            </span>
          </div>
          <h2 className="section-heading">Tech Arsenal</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The tools and technologies powering my DevOps workflow — from cloud infra to security scanning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Category selector — left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {categories.map((cat, index) => {
              const isActive = openCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  onClick={() => setOpenCategory(cat.id)}
                  onMouseEnter={() => setHoveredCat(cat.id)}
                  onMouseLeave={() => setHoveredCat(null)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: isActive
                      ? `linear-gradient(135deg, ${cat.color}15 0%, ${cat.color}08 100%)`
                      : hoveredCat === cat.id
                        ? `linear-gradient(135deg, ${cat.color}10 0%, ${cat.color}05 100%)`
                        : 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: (isActive || hoveredCat === cat.id)
                      ? `1px solid ${cat.color}50`
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isActive
                      ? `0 0 24px ${cat.glowColor}40, 0 1px 0 0 rgba(255,255,255,0.15) inset`
                      : hoveredCat === cat.id
                        ? `0 0 16px ${cat.glowColor}30, 0 1px 0 0 rgba(255,255,255,0.12) inset`
                        : '0 1px 0 0 rgba(255,255,255,0.08) inset, 0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'all 0.25s ease',
                  }}
                  whileHover={{ x: 4 }}
                >
                  {/* Specular */}
                  {(isActive || hoveredCat === cat.id) && (
                    <div style={{
                      position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.28), ${cat.color}60, transparent)`,
                    }} />
                  )}

                  {/* Icon bubble */}
                  <div style={{
                    width: '42px', height: '42px',
                    borderRadius: '0.75rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.25rem',
                    background: (isActive || hoveredCat === cat.id) ? `${cat.color}20` : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${(isActive || hoveredCat === cat.id) ? cat.color + '40' : 'rgba(255,255,255,0.1)'}`,
                    flexShrink: 0,
                    transition: 'all 0.25s ease',
                    boxShadow: isActive
                      ? `0 0 16px ${cat.glowColor}`
                      : hoveredCat === cat.id
                        ? `0 0 10px ${cat.glowColor}`
                        : 'none',
                  }}>
                    {cat.icon}
                  </div>

                  <div>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: (isActive || hoveredCat === cat.id) ? cat.color : 'rgba(229,231,235,1)',
                      transition: 'color 0.25s ease',
                    }}>
                      {cat.label}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'rgba(107,114,128,1)',
                      marginTop: '0.15rem',
                    }}>
                      {cat.skills.length} technologies
                    </div>
                  </div>

                  {/* Arrow dot */}
                  {(isActive || hoveredCat === cat.id) && (
                    <div style={{
                      marginLeft: 'auto',
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: cat.color,
                      boxShadow: `0 0 8px ${cat.color}`,
                      opacity: isActive ? 1 : 0.6,
                    }} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills panel — right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <motion.div
              key={openCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                padding: '2rem',
                background: 'linear-gradient(140deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 60%, rgba(168,85,247,0.04) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `1px solid ${activeCat.color}30`,
                borderRadius: '1.25rem',
                boxShadow: `0 0 40px ${activeCat.glowColor}20, 0 1px 0 0 rgba(255,255,255,0.18) inset, 0 12px 40px rgba(0,0,0,0.4)`,
                overflow: 'hidden',
                height: '100%',
              }}
            >
              {/* Specular line */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), ${activeCat.color}80, transparent)`,
              }} />

              {/* Background tint */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${activeCat.color}06 0%, transparent 50%)`,
                pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '1.75rem', position: 'relative', zIndex: 1,
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '0.875rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                  background: `${activeCat.color}18`,
                  border: `1px solid ${activeCat.color}40`,
                  boxShadow: `0 0 20px ${activeCat.glowColor}`,
                }}>
                  {activeCat.icon}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: activeCat.color,
                }}>
                  {activeCat.label}
                </h3>
              </div>

              {/* Skill rows */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {activeCat.skills.map((skill, i) => (
                  <SkillRow
                    key={skill.name}
                    skill={skill}
                    isVisible={isInView}
                    delay={0.4 + i * 0.1}
                  />
                ))}
              </div>

              {/* Legend footer */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                position: 'relative', zIndex: 1,
              }}>
                {(Object.entries(levelConfig) as [keyof typeof levelConfig, typeof levelConfig[keyof typeof levelConfig]][]).map(([key, cfg]) => (
                  <span key={key} style={{
                    fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                    padding: '0.15rem 0.5rem', borderRadius: '999px',
                    background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text,
                  }}>
                    {cfg.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating tech logos strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '3rem',
            display: 'flex', gap: '1rem', justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['Istio', 'Global Accelerator', 'Kinesis', 'Athena', 'OSV Scanner', 'Prometheus', 'VPC', 'KMS'].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.05 }}
              whileHover={{ y: -4, scale: 1.08 }}
              className="glass-pill"
              style={{ padding: '0.35rem 0.875rem', cursor: 'default' }}
            >
              <span style={{
                fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)',
                color: 'rgba(209,213,219,1)',
              }}>
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechArsenal;
