'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  id: number;
  text: string;
  type: 'command' | 'output' | 'success' | 'error' | 'info';
}

const terminalSequence = [
  { text: '$ kubectl get pods --all-namespaces', type: 'command' as const, delay: 0 },
  { text: 'NAMESPACE     NAME                          READY   STATUS    RESTARTS', type: 'info' as const, delay: 800 },
  { text: 'production    nginx-deployment-7d9c...      3/3     Running   0', type: 'success' as const, delay: 1200 },
  { text: 'production    redis-cluster-abc123...       3/3     Running   0', type: 'success' as const, delay: 1400 },
  { text: 'staging       api-service-xyz789...         2/2     Running   1', type: 'success' as const, delay: 1600 },
  { text: '', type: 'output' as const, delay: 2000 },
  { text: '$ terraform apply -auto-approve', type: 'command' as const, delay: 2200 },
  { text: 'Plan: 15 to add, 3 to change, 0 to destroy.', type: 'info' as const, delay: 2800 },
  { text: 'aws_instance.web_server: Creating...', type: 'output' as const, delay: 3200 },
  { text: 'aws_instance.web_server: Still creating... [10s elapsed]', type: 'output' as const, delay: 3800 },
  { text: 'aws_instance.web_server: Creation complete after 15s', type: 'success' as const, delay: 4400 },
  { text: '', type: 'output' as const, delay: 4800 },
  { text: '$ docker-compose up -d', type: 'command' as const, delay: 5000 },
  { text: 'Creating network "app_default" with the default driver', type: 'output' as const, delay: 5400 },
  { text: 'Creating app_db_1    ... done', type: 'success' as const, delay: 5800 },
  { text: 'Creating app_redis_1 ... done', type: 'success' as const, delay: 6000 },
  { text: 'Creating app_web_1   ... done', type: 'success' as const, delay: 6200 },
  { text: '', type: 'output' as const, delay: 6600 },
  { text: '$ aws cloudwatch get-metric-statistics --namespace AWS/EC2', type: 'command' as const, delay: 6800 },
  { text: '✓ CPU Utilization: 23.5%', type: 'success' as const, delay: 7200 },
  { text: '✓ Network In: 1.2 MB/s', type: 'success' as const, delay: 7400 },
  { text: '✓ Disk Read Ops: 450/s', type: 'success' as const, delay: 7600 },
  { text: '✓ All systems operational', type: 'success' as const, delay: 8000 },
];

export default function HolographicTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= terminalSequence.length) {
      // Reset after completing sequence
      const resetTimer = setTimeout(() => {
        setLines([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = terminalSequence[currentIndex];
    const timer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          id: currentIndex,
          text: currentLine.text,
          type: currentLine.type,
        },
      ]);
      setCurrentIndex((prev) => prev + 1);
    }, currentLine.delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command':
        return 'text-neon-blue';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'info':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Holographic effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl blur-xl animate-pulse-glow pointer-events-none" />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <motion.div
          className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent"
          animate={{
            y: [0, 400],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Terminal window */}
      <div className="relative glass-card border-2 border-neon-blue/30 rounded-xl overflow-hidden shadow-neon-blue">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-dark-800/80 border-b border-neon-blue/20">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 font-mono">
              DevOps Terminal - Production Environment
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-xs text-green-400 font-mono">LIVE</span>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="relative p-6 h-96 overflow-y-auto font-mono text-sm bg-dark-900/95 backdrop-blur-md"
          style={{
            textShadow: '0 0 10px currentColor',
          }}
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 ${getLineColor(line.type)}`}
              >
                {line.type === 'command' && (
                  <span className="text-neon-purple mr-2">➜</span>
                )}
                {line.text || '\u00A0'}
                {line.type === 'command' && (
                  <motion.span
                    className="inline-block w-2 h-4 ml-1 bg-neon-blue"
                    animate={{
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cursor when idle */}
          {lines.length > 0 && currentIndex >= terminalSequence.length && (
            <motion.div
              className="flex items-center text-neon-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-neon-purple mr-2">➜</span>
              <motion.span
                className="inline-block w-2 h-4 bg-neon-blue"
                animate={{
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-800/80 border-t border-neon-blue/20 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-green-400">● Connected</span>
            <span className="text-gray-400">AWS us-east-1</span>
            <span className="text-gray-400">Cluster: prod-k8s</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Lines: {lines.length}</span>
            <span>|</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue/50 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue/50 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue/50 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue/50 rounded-br-xl" />
      </div>

      {/* Reflection effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-neon-blue/5 to-transparent -z-10 blur-xl"
        style={{
          transform: 'scaleY(-1) translateY(100%)',
        }}
      />
    </div>
  );
}
