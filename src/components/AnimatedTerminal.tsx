'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';

const AnimatedTerminal = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const terminalCommands = [
    '$ whoami',
    500,
    '$ whoami\nDevOps & Cloud Engineer',
    1000,
    '$ cat skills.txt',
    500,
    '$ cat skills.txt\n> AWS | Terraform | Docker | Kubernetes\n> CI/CD | Python | Bash | Linux',
    1500,
    '$ echo $PASSION',
    500,
    '$ echo $PASSION\nAutomating infrastructure & Building scalable systems',
    1500,
    '$ ./deploy.sh --production',
    500,
    '$ ./deploy.sh --production\n✓ Infrastructure provisioned\n✓ Containers deployed\n✓ Pipeline running\n✓ Monitoring active',
    2000,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Terminal window */}
      <div className="glass-card overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-dark-700/50 border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-500 font-mono ml-2">
            devops@portfolio:~
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-mono text-sm min-h-[300px] bg-dark-800/30">
          <TypeAnimation
            sequence={terminalCommands}
            wrapper="div"
            cursor={false}
            repeat={Infinity}
            className="text-green-400 whitespace-pre-wrap"
            style={{ display: 'block' }}
          />
          {showCursor && (
            <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
          )}
        </div>

        {/* Animated scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            height: '100%',
          }}
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 rounded-3xl blur-xl -z-10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default AnimatedTerminal;
