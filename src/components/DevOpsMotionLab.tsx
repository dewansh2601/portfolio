'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';

const pipelineStages = ['Commit', 'Build', 'Test', 'Scan', 'Deploy'];
const terraformResources = [
  { name: 'aws_vpc.main', action: '+' as const },
  { name: 'aws_ecs_service.api', action: '~' as const },
  { name: 'aws_security_group.legacy', action: '-' as const },
  { name: 'aws_rds_cluster.prod', action: '+' as const },
];

function PipelineFlow() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length);
    }, 1200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold text-neon-blue mb-4">CI/CD Pipeline Flow</p>
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-2">
        {pipelineStages.map((stage, index) => {
          const isActive = index === activeStage;
          const isDone = index < activeStage;
          return (
            <div key={stage} className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? '0 0 20px rgba(0, 212, 255, 0.5)' : '0 0 0px rgba(0, 212, 255, 0)',
                }}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center text-[10px] font-mono ${
                  isDone || isActive
                    ? 'border-neon-blue/70 text-neon-blue bg-neon-blue/10'
                    : 'border-white/15 text-gray-400'
                }`}
              >
                {stage.slice(0, 3).toUpperCase()}
              </motion.div>
              {index < pipelineStages.length - 1 && (
                <div className="w-8 h-1 rounded bg-dark-700 overflow-hidden">
                  <motion.div
                    animate={{ width: isDone ? '100%' : isActive ? '70%' : '0%' }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-4 font-mono">
        status: {pipelineStages[activeStage].toLowerCase()} in progress...
      </p>
    </div>
  );
}

function KubernetesPulseMap() {
  const nodes = useMemo(
    () => [
      { id: 'ingress', x: 15, y: 50, color: 'bg-blue-400' },
      { id: 'api', x: 40, y: 28, color: 'bg-cyan-400' },
      { id: 'worker', x: 40, y: 72, color: 'bg-cyan-400' },
      { id: 'db', x: 75, y: 50, color: 'bg-purple-400' },
    ],
    []
  );

  const packets = [
    { from: { x: 15, y: 50 }, to: { x: 40, y: 28 }, delay: 0 },
    { from: { x: 15, y: 50 }, to: { x: 40, y: 72 }, delay: 0.7 },
    { from: { x: 40, y: 28 }, to: { x: 75, y: 50 }, delay: 1.2 },
    { from: { x: 40, y: 72 }, to: { x: 75, y: 50 }, delay: 1.8 },
  ];

  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold text-neon-blue mb-4">Kubernetes Cluster Pulse</p>
      <div className="relative h-48 rounded-xl border border-white/10 bg-dark-900/60 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {packets.map((packet, idx) => (
            <line
              key={idx}
              x1={`${packet.from.x}%`}
              y1={`${packet.from.y}%`}
              x2={`${packet.to.x}%`}
              y2={`${packet.to.y}%`}
              stroke="rgba(120,160,255,0.25)"
              strokeWidth="1.5"
            />
          ))}
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className={`w-4 h-4 rounded-full ${node.color} shadow-lg`} />
            <p className="text-[10px] text-gray-300 mt-1 -ml-3 font-mono">{node.id}</p>
          </motion.div>
        ))}

        {packets.map((packet, idx) => (
          <motion.div
            key={`p-${idx}`}
            className="absolute w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(0,212,255,0.8)]"
            style={{ left: `${packet.from.x}%`, top: `${packet.from.y}%` }}
            animate={{
              left: [`${packet.from.x}%`, `${packet.to.x}%`],
              top: [`${packet.from.y}%`, `${packet.to.y}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2, delay: packet.delay, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>
    </div>
  );
}

function TerraformPlanVisualizer() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => (prev + 12) % 112);
    }, 700);
    return () => window.clearInterval(timer);
  }, []);

  const isApplied = progress >= 96;

  return (
    <div className="glass-card p-5">
      <p className="text-sm font-semibold text-neon-blue mb-4">Terraform Plan Visualizer</p>
      <div className="space-y-3">
        {terraformResources.map((resource) => {
          const tone =
            resource.action === '+' ? 'text-green-400 border-green-400/30 bg-green-400/10' :
            resource.action === '~' ? 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10' :
            'text-red-400 border-red-400/30 bg-red-400/10';

          return (
            <div key={resource.name} className="flex items-center justify-between text-sm border border-white/10 rounded-lg px-3 py-2 bg-dark-800/60">
              <span className="text-gray-300 font-mono">{resource.name}</span>
              <span className={`px-2 py-0.5 rounded border text-xs font-mono ${tone}`}>
                {resource.action}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="h-2 bg-dark-700 rounded overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2 font-mono">
          {isApplied ? 'apply complete: infrastructure converged' : `applying plan... ${Math.min(progress, 100)}%`}
        </p>
      </div>
    </div>
  );
}

export default function DevOpsMotionLab() {
  return (
    <section id="devops-lab" className="story-section py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <AnimatedHeading text="DevOps Motion Lab" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interactive visualizations for CI/CD execution, Kubernetes traffic pulse, and Terraform plan-to-apply lifecycle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <PipelineFlow />
          <KubernetesPulseMap />
          <TerraformPlanVisualizer />
        </div>
      </div>
    </section>
  );
}
