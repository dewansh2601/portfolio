'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const CloudInfrastructure3D = dynamic(() => import('./CloudInfrastructure3D'), {
  ssr: false,
  loading: () => <div className="h-[700px] flex items-center justify-center text-gray-400">Loading Cloud Infrastructure...</div>,
});

const CICDPipeline3D = dynamic(() => import('./CICDPipeline3D'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center text-gray-400">Loading CI/CD Pipeline...</div>,
});

const ServerRacks3D = dynamic(() => import('./ServerRacks3D'), {
  ssr: false,
  loading: () => <div className="h-[600px] flex items-center justify-center text-gray-400">Loading Server Racks...</div>,
});

const ContainerOrchestration3D = dynamic(() => import('./ContainerOrchestration3D'), {
  ssr: false,
  loading: () => <div className="h-[700px] flex items-center justify-center text-gray-400">Loading Container Orchestration...</div>,
});

type ShowcaseTab = 'cloud' | 'cicd' | 'infrastructure' | 'containers';

interface Tab {
  id: ShowcaseTab;
  label: string;
  description: string;
  icon: string;
}

const tabs: Tab[] = [
  {
    id: 'cloud',
    label: 'Cloud Architecture',
    description: 'Multi-layer AWS cloud infrastructure with EC2, S3, RDS, and networking services',
    icon: '☁️',
  },
  {
    id: 'cicd',
    label: 'CI/CD Pipeline',
    description: 'Automated deployment pipeline from code commit to production monitoring',
    icon: '🚀',
  },
  {
    id: 'infrastructure',
    label: 'Data Centers',
    description: 'Server rack visualization with real-time data flow and network switching',
    icon: '🖥️',
  },
  {
    id: 'containers',
    label: 'Kubernetes',
    description: 'Container orchestration with load balancing and pod management',
    icon: '☸️',
  },
];

export default function DevOpsShowcase() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('cloud');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePosition({ x, y });
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={ref}
      id="devops-showcase"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">DevOps & Cloud Engineering</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interactive 3D visualizations of cloud infrastructure, automation pipelines, and container orchestration
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon-blue'
                    : 'glass-card text-gray-300 hover:border-neon-blue/50'
                }
              `}
            >
              <span className="mr-2 text-xl">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>

              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Description */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-gray-300 text-lg">
            {tabs.find((t) => t.id === activeTab)?.description}
          </p>
        </motion.div>

        {/* 3D Visualization Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          onMouseMove={handleMouseMove}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
          }}
          className="relative glass-card rounded-2xl overflow-hidden border-2 border-neon-blue/20 shadow-2xl transition-transform duration-200 ease-out"
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

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neon-blue/50 rounded-tl-2xl z-10" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-neon-purple/50 rounded-tr-2xl z-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-neon-purple/50 rounded-bl-2xl z-10" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neon-blue/50 rounded-br-2xl z-10" />

          {/* Tab Content */}
          <div className="relative">
            {activeTab === 'cloud' && (
              <motion.div
                key="cloud"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CloudInfrastructure3D />
              </motion.div>
            )}

            {activeTab === 'cicd' && (
              <motion.div
                key="cicd"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CICDPipeline3D />
              </motion.div>
            )}

            {activeTab === 'infrastructure' && (
              <motion.div
                key="infrastructure"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ServerRacks3D />
              </motion.div>
            )}

            {activeTab === 'containers' && (
              <motion.div
                key="containers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ContainerOrchestration3D />
              </motion.div>
            )}
          </div>

          {/* Controls hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-dark-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-neon-blue/30 z-10"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <p className="text-xs text-gray-400">
              🖱️ Move mouse for 3D effect • Drag to rotate • Scroll to zoom
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
