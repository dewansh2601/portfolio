'use client';

// ============================================
// Live Infrastructure Status Dashboard
// Liquid glass ops panel — pipeline badges,
// uptime counters, streaming deploy log,
// cloud region indicators
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Fake live deploy log lines ──────────────
const deployLogLines = [
  { time: '21:04:12', level: 'INFO',    msg: 'Triggered by push to main — SHA: a3f92c1' },
  { time: '21:04:13', level: 'INFO',    msg: 'Checking out repository...' },
  { time: '21:04:16', level: 'INFO',    msg: 'Building Docker image (linux/amd64)...' },
  { time: '21:05:02', level: 'SUCCESS', msg: 'Image built: dewansh/app:a3f92c1' },
  { time: '21:05:03', level: 'INFO',    msg: 'Running Trivy scan on image...' },
  { time: '21:06:44', level: 'SUCCESS', msg: 'Trivy: 0 CRITICAL, 2 LOW — passed gate' },
  { time: '21:06:45', level: 'INFO',    msg: 'Pushing image to ECR (ap-south-1)...' },
  { time: '21:07:08', level: 'SUCCESS', msg: 'ECR push complete — image tagged :latest' },
  { time: '21:07:09', level: 'INFO',    msg: 'Deploying to ECS service: prod-api...' },
  { time: '21:08:41', level: 'SUCCESS', msg: 'ECS deployment stable — 2/2 tasks running' },
  { time: '21:08:42', level: 'INFO',    msg: 'Health checks passing — traffic routed' },
  { time: '21:08:43', level: 'SUCCESS', msg: '✓ Pipeline complete in 4m 31s' },
];

const levelColor: Record<string, string> = {
  INFO:    'rgba(156,163,175,1)',
  SUCCESS: '#22c55e',
  WARN:    '#eab308',
  ERROR:   '#ef4444',
};

// ── Pipeline runs ───────────────────────────
const pipelineRuns = [
  { repo: 'prod-api',     branch: 'main',    status: 'success', ago: '8 min ago',  sha: 'a3f92c1' },
  { repo: 'infra-tf',     branch: 'main',    status: 'success', ago: '2 hrs ago',  sha: 'b1e84d3' },
  { repo: 'monitoring',   branch: 'feature', status: 'running', ago: 'just now',   sha: 'c9d11f7' },
  { repo: 'frontend',     branch: 'main',    status: 'success', ago: '1 day ago',  sha: 'd4720ab' },
];

// ── Services uptime ──────────────────────────
const services = [
  { name: 'prod-api',       uptime: 99.97, region: 'ap-south-1',  status: 'healthy' },
  { name: 'prod-db (RDS)',   uptime: 99.99, region: 'ap-south-1',  status: 'healthy' },
  { name: 'monitoring',     uptime: 99.82, region: 'us-east-1',   status: 'healthy' },
  { name: 'staging-api',    uptime: 99.80, region: 'ap-south-1',  status: 'healthy' },
];

// ── Cloud regions ────────────────────────────
const regions = [
  { id: 'ap-south-1',  label: 'Mumbai',    x: 68, y: 44, active: true  },
  { id: 'us-east-1',   label: 'N. Virginia', x: 22, y: 36, active: true  },
  { id: 'eu-west-1',   label: 'Ireland',   x: 44, y: 28, active: false },
  { id: 'ap-east-1',   label: 'HK',        x: 79, y: 42, active: false },
];

// ── Animated counter hook ────────────────────
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [val, setVal] = useState(99.0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const startVal = 99.0;
    const step = (now: number) => {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      setVal(parseFloat((startVal + elapsed * (target - startVal)).toFixed(2)));
      if (elapsed < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, trigger]);
  return val;
}

// ── Status badge ─────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { color: string; label: string }> = {
    success:  { color: '#22c55e', label: '✓ passed' },
    running:  { color: '#eab308', label: '⟳ running' },
    failed:   { color: '#ef4444', label: '✗ failed' },
    healthy:  { color: '#22c55e', label: 'Healthy' },
    degraded: { color: '#eab308', label: 'Degraded' },
  };
  const s = map[status] || { color: '#6b7280', label: status };
  return (
    <span style={{
      fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
      padding: '0.15rem 0.55rem', borderRadius: '999px',
      background: `${s.color}18`, border: `1px solid ${s.color}40`,
      color: s.color,
      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: s.color,
        boxShadow: `0 0 6px ${s.color}`,
        animation: status === 'running' ? 'pulse-yellow 2s infinite' : 'none',
        display: 'inline-block', flexShrink: 0,
      }} />
      {s.label}
    </span>
  );
};

// ── Main component ────────────────────────────
const InfraStatus = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [logIndex, setLogIndex] = useState(0);
  const totalUptime = useCountUp(99.96, 1.8, isInView);

  // Stream log lines one by one
  useEffect(() => {
    if (!isInView) return;
    if (logIndex >= deployLogLines.length) return;
    const timer = setTimeout(() => setLogIndex(i => i + 1), 280);
    return () => clearTimeout(timer);
  }, [isInView, logIndex]);

  const glassPanel = {
    background: 'linear-gradient(140deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 60%, rgba(168,85,247,0.04) 100%)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '1.25rem',
    boxShadow: '0 1px 0 0 rgba(255,255,255,0.15) inset, 0 12px 40px rgba(0,0,0,0.4)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const specular = (
    <div style={{
      position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
    }} />
  );

  return (
    <section
      id="infrastatus"
      ref={ref}
      className="story-section py-20 md:py-32 relative overflow-hidden"
    >
      {/* Ambient green glow */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '5%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)',
        pointerEvents: 'none', borderRadius: '50%',
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
            marginBottom: '0.75rem', padding: '0.25rem 0.75rem',
            background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '999px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'pulse-green 2s infinite', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#22c55e', letterSpacing: '0.15em' }}>
              LIVE
            </span>
          </div>
          <h2 className="section-heading">Infra Status</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A live-look at my cloud infrastructure — pipeline runs, service uptime, and recent deployments.{' '}
            <span style={{ fontSize: '0.75rem', color: 'rgba(107,114,128,1)', fontStyle: 'italic' }}>(simulated data)</span>
          </p>
        </motion.div>

        {/* Top row — summary stat + pipeline runs */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {/* Overall uptime stat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{ ...glassPanel, padding: '1.75rem', textAlign: 'center' }}
          >
            {specular}
            <div style={{
              fontSize: '0.7rem', letterSpacing: '0.15em',
              color: 'rgba(107,114,128,1)', marginBottom: '0.75rem',
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            }}>
              Overall Uptime — 30d
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #22c55e, #00d4ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', lineHeight: 1,
            }}>
              {totalUptime.toFixed(2)}%
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(156,163,175,1)', marginTop: '0.5rem' }}>
              4 services monitored
            </div>
            {/* Mini uptime bar */}
            <div style={{
              marginTop: '1rem', height: '4px', borderRadius: '999px',
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: '999px',
                background: 'linear-gradient(90deg, #22c55e, #00d4ff)',
                width: `${totalUptime}%`,
                transition: 'width 1.8s ease',
                boxShadow: '0 0 10px rgba(34,197,94,0.5)',
              }} />
            </div>
          </motion.div>

          {/* Pipeline runs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
            style={{ ...glassPanel, padding: '1.5rem' }}
          >
            {specular}
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.12em',
              color: 'rgba(107,114,128,1)', marginBottom: '1rem',
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            }}>
              Recent Pipeline Runs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {pipelineRuns.map((run, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: '0.75rem', flexWrap: 'wrap',
                    padding: '0.6rem 0.875rem', borderRadius: '0.75rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <StatusBadge status={run.status} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00d4ff' }}>
                    {run.repo}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(107,114,128,1)' }}>
                    {run.branch}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(75,85,99,1)', marginLeft: 'auto' }}>
                    {run.sha} · {run.ago}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom row — services + deploy log */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Services uptime */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35 }}
            style={{ ...glassPanel, padding: '1.5rem' }}
          >
            {specular}
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.12em',
              color: 'rgba(107,114,128,1)', marginBottom: '1.25rem',
              fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
            }}>
              Service Health
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.map((svc, i) => (
                <motion.div
                  key={svc.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.09 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(229,231,235,1)', fontFamily: 'var(--font-mono)' }}>
                        {svc.name}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'rgba(75,85,99,1)', marginLeft: '0.5rem' }}>
                        {svc.region}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: svc.uptime >= 99.9 ? '#22c55e' : '#eab308' }}>
                        {svc.uptime}%
                      </span>
                      <StatusBadge status={svc.status} />
                    </div>
                  </div>
                  <div style={{ height: '4px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${svc.uptime}%` } : {}}
                      transition={{ delay: 0.6 + i * 0.09, duration: 1, ease: 'easeOut' }}
                      style={{
                        height: '100%', borderRadius: '999px',
                        background: svc.uptime >= 99.9
                          ? 'linear-gradient(90deg, #22c55e, #00d4ff)'
                          : 'linear-gradient(90deg, #eab308, #f97316)',
                        boxShadow: svc.uptime >= 99.9 ? '0 0 8px rgba(34,197,94,0.5)' : '0 0 8px rgba(234,179,8,0.5)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Streaming deploy log */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            style={{ ...glassPanel, padding: '1.5rem' }}
          >
            {specular}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                fontSize: '0.72rem', letterSpacing: '0.12em',
                color: 'rgba(107,114,128,1)',
                fontFamily: 'var(--font-mono)', textTransform: 'uppercase',
              }}>
                Deployment Log — prod-api
              </div>
              {/* Fake terminal controls */}
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                ))}
              </div>
            </div>
            {/* Log container */}
            <div style={{
              height: '220px', overflowY: 'auto',
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              lineHeight: 1.7,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '0.75rem',
              padding: '0.875rem 1rem',
            }}>
              {deployLogLines.slice(0, logIndex).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.1rem' }}
                >
                  <span style={{ color: 'rgba(75,85,99,1)', flexShrink: 0 }}>{line.time}</span>
                  <span style={{ color: levelColor[line.level], flexShrink: 0, width: '3.5rem' }}>[{line.level}]</span>
                  <span style={{ color: 'rgba(209,213,219,1)' }}>{line.msg}</span>
                </motion.div>
              ))}
              {/* Blinking cursor */}
              {logIndex < deployLogLines.length && (
                <span style={{
                  display: 'inline-block', width: '0.5rem', height: '0.9em',
                  background: '#00d4ff', animation: 'pulse-green 1s infinite',
                  verticalAlign: 'text-bottom',
                }} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Cloud regions mini map */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          style={{ ...glassPanel, padding: '1.5rem', marginTop: '1.25rem' }}
        >
          {specular}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'rgba(107,114,128,1)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Cloud Regions
            </span>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#22c55e' }}>
              {regions.filter(r => r.active).length} active
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {regions.map((region, i) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.08 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.5rem 0.875rem', borderRadius: '0.75rem',
                  background: region.active ? 'rgba(0,212,255,0.06)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${region.active ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <span style={{
                  width: 7, height: 7, borderRadius: '50%',
                  background: region.active ? '#22c55e' : 'rgba(107,114,128,1)',
                  boxShadow: region.active ? '0 0 8px #22c55e' : 'none',
                  animation: region.active ? 'pulse-green 2s infinite' : 'none',
                  display: 'inline-block',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: region.active ? '#00d4ff' : 'rgba(107,114,128,1)' }}>
                  {region.id}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(75,85,99,1)' }}>
                  {region.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InfraStatus;
