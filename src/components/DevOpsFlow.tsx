'use client';

// ============================================
// DevOps Workflow Visualizer
// Interactive pipeline diagram: Code → Build →
// Test → Security Scan → ECR → Deploy → Monitor
// Liquid glass nodes with animated flow particles
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface PipelineStage {
  id: string;
  label: string;
  icon: string;
  tool: string;
  toolDetail: string;
  color: string;
  glowColor: string;
  status: 'success' | 'running' | 'pending';
  duration?: string;
}

const stages: PipelineStage[] = [
  {
    id: 'code',
    label: 'Code',
    icon: '⌨️',
    tool: 'Git + GitHub',
    toolDetail: 'Feature branch → PR → Code Review → Merge to main',
    color: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.5)',
    status: 'success',
    duration: '—',
  },
  {
    id: 'build',
    label: 'Build',
    icon: '🔨',
    tool: 'GitHub Actions',
    toolDetail: 'Docker multi-stage build with layer caching. ARM64 + AMD64 manifest.',
    color: '#00d4ff',
    glowColor: 'rgba(0,212,255,0.5)',
    status: 'success',
    duration: '2m 14s',
  },
  {
    id: 'test',
    label: 'Test',
    icon: '✅',
    tool: 'Jest / PyTest',
    toolDetail: 'Unit tests, integration tests, coverage reports. Gate: >80% coverage.',
    color: '#34d399',
    glowColor: 'rgba(52,211,153,0.5)',
    status: 'success',
    duration: '1m 38s',
  },
  {
    id: 'scan',
    label: 'Security Scan',
    icon: '🔒',
    tool: 'Trivy + OWASP ZAP + OSV',
    toolDetail: 'Container image scan (Trivy), DAST (OWASP ZAP), SCA (OSV Scanner). Blocks on CRITICAL CVEs.',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.5)',
    status: 'success',
    duration: '3m 02s',
  },
  {
    id: 'push',
    label: 'Push to ECR',
    icon: '📦',
    tool: 'AWS ECR',
    toolDetail: 'Tagged and pushed to Amazon ECR. Immutable tags. Lifecycle policy keeps last 5 images.',
    color: '#ff9900',
    glowColor: 'rgba(255,153,0,0.5)',
    status: 'success',
    duration: '0m 48s',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: '🚀',
    tool: 'AWS EC2 / ECS',
    toolDetail: 'Blue/green deployment via ECS. Health checks before traffic cut-over. Terraform managed.',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.5)',
    status: 'running',
    duration: '4m 21s',
  },
  {
    id: 'monitor',
    label: 'Monitor',
    icon: '📊',
    tool: 'CloudWatch + Grafana',
    toolDetail: 'AWS CloudWatch metrics, Grafana dashboards, Prometheus scraping. AlertManager for on-call.',
    color: '#f472b6',
    glowColor: 'rgba(244,114,182,0.5)',
    status: 'pending',
    duration: '—',
  },
];

const statusColors = {
  success: '#22c55e',
  running: '#eab308',
  pending: 'rgba(255,255,255,0.25)',
};

const DevOpsFlow = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    if (isInView && !animatedIn) {
      setAnimatedIn(true);
    }
  }, [isInView, animatedIn]);

  return (
    <section
      id="devopsflow"
      ref={ref}
      className="story-section py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#00d4ff',
                letterSpacing: '0.15em',
                padding: '0.25rem 0.75rem',
                background: 'rgba(0,212,255,0.08)',
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: '999px',
              }}
            >
              PIPELINE
            </span>
          </div>
          <h2 className="section-heading">DevOps Workflow</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My end-to-end CI/CD pipeline — from commit to production. Click any stage to see the tools and approach.
          </p>
        </motion.div>

        {/* Pipeline — scrollable on mobile, horizontal on desktop */}
        <div className="overflow-x-auto pb-4">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 0,
              minWidth: 'max-content',
              margin: '0 auto',
              padding: '2rem 1rem',
            }}
          >
            {stages.map((stage, index) => (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Stage node */}
                <motion.button
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  animate={animatedIn ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
                  onClick={() => setSelectedStage(selectedStage?.id === stage.id ? null : stage)}
                  style={{
                    position: 'relative',
                    width: '110px',
                    padding: '1.25rem 0.75rem',
                    background: 'linear-gradient(140deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%, rgba(168,85,247,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: selectedStage?.id === stage.id
                      ? `1px solid ${stage.color}`
                      : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    boxShadow: selectedStage?.id === stage.id
                      ? `0 0 30px ${stage.glowColor}, 0 1px 0 0 rgba(255,255,255,0.2) inset, 0 8px 32px rgba(0,0,0,0.4)`
                      : '0 1px 0 0 rgba(255,255,255,0.14) inset, 0 8px 24px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Top specular */}
                  <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    borderRadius: '999px',
                  }} />

                  {/* Status dot */}
                  <div style={{
                    position: 'absolute', top: '0.5rem', right: '0.5rem',
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: statusColors[stage.status],
                    boxShadow: stage.status !== 'pending' ? `0 0 8px ${statusColors[stage.status]}` : 'none',
                    animation: stage.status === 'running' ? 'pulse-yellow 2s infinite' : 'none',
                  }} />

                  {/* Icon */}
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stage.icon}</div>

                  {/* Label */}
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: selectedStage?.id === stage.id ? stage.color : 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 1.2,
                    transition: 'color 0.3s ease',
                  }}>
                    {stage.label}
                  </div>

                  {/* Duration chip */}
                  {stage.duration !== '—' && (
                    <div style={{
                      marginTop: '0.4rem',
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {stage.duration}
                    </div>
                  )}
                </motion.button>

                {/* Connector line with particle */}
                {index < stages.length - 1 && (
                  <div style={{ position: 'relative', width: '40px', height: '2px', flexShrink: 0 }}>
                    {/* Base line */}
                    <div style={{
                      position: 'absolute', top: '50%', left: 0, right: 0,
                      height: '1px',
                      background: 'linear-gradient(90deg, rgba(0,212,255,0.4), rgba(168,85,247,0.4))',
                      transform: 'translateY(-50%)',
                    }} />
                    {/* Flow particle */}
                    {animatedIn && (
                      <motion.div
                        style={{
                          position: 'absolute', top: '50%',
                          width: '6px', height: '6px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${stages[index].color}, ${stages[index + 1].color})`,
                          boxShadow: `0 0 8px ${stages[index].glowColor}`,
                          transform: 'translateY(-50%)',
                        }}
                        animate={{ x: [0, 34, 34], opacity: [0, 1, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: index * 0.25 + 0.8,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    {/* Arrow head */}
                    <div style={{
                      position: 'absolute', right: 0, top: '50%',
                      transform: 'translateY(-50%)',
                      width: 0, height: 0,
                      borderLeft: '5px solid rgba(168,85,247,0.6)',
                      borderTop: '3px solid transparent',
                      borderBottom: '3px solid transparent',
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedStage && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                marginTop: '1.5rem',
                padding: '1.5rem 2rem',
                background: 'linear-gradient(140deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 60%, rgba(168,85,247,0.05) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `1px solid ${selectedStage.color}44`,
                borderRadius: '1.25rem',
                boxShadow: `0 0 40px ${selectedStage.glowColor}25, 0 1px 0 0 rgba(255,255,255,0.18) inset, 0 8px 32px rgba(0,0,0,0.4)`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Specular highlight */}
              <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), ${selectedStage.color}80, rgba(255,255,255,0.3), transparent)`,
              }} />

              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div style={{
                  fontSize: '2.5rem',
                  width: '4rem', height: '4rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${selectedStage.color}15`,
                  border: `1px solid ${selectedStage.color}40`,
                  borderRadius: '1rem',
                  flexShrink: 0,
                }}>
                  {selectedStage.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: selectedStage.color,
                    }}>
                      {selectedStage.label}
                    </h3>
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.6rem',
                      background: `${selectedStage.color}15`,
                      border: `1px solid ${selectedStage.color}40`,
                      borderRadius: '999px',
                      color: selectedStage.color,
                      fontFamily: 'var(--font-mono)',
                    }}>
                      {selectedStage.tool}
                    </span>
                  </div>
                  <p style={{ color: 'rgba(209,213,219,1)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {selectedStage.toolDetail}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          style={{
            display: 'flex', gap: '1.5rem', justifyContent: 'center',
            marginTop: '2rem', flexWrap: 'wrap',
          }}
        >
          {[
            { status: 'success' as const, label: 'Passed' },
            { status: 'running' as const, label: 'In Progress' },
            { status: 'pending' as const, label: 'Waiting' },
          ].map(({ status, label }) => (
            <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: statusColors[status],
                boxShadow: status !== 'pending' ? `0 0 8px ${statusColors[status]}` : 'none',
              }} />
              <span style={{ fontSize: '0.75rem', color: 'rgba(156,163,175,1)' }}>{label}</span>
            </div>
          ))}
          <span style={{ fontSize: '0.75rem', color: 'rgba(107,114,128,1)' }}>· Click a stage to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default DevOpsFlow;
