'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CodeSnippet {
  code: string;
  language: string;
  color: string;
}

const codeSnippets: CodeSnippet[] = [
  {
    code: `# Deploy infrastructure
terraform apply -auto-approve`,
    language: 'bash',
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-app`,
    language: 'yaml',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    code: `docker build -t app:latest .
docker push registry/app:latest`,
    language: 'bash',
    color: 'from-cyan-500/20 to-cyan-600/20',
  },
  {
    code: `resource "aws_instance" "web" {
  ami = "ami-12345"
  instance_type = "t3.micro"
}`,
    language: 'hcl',
    color: 'from-indigo-500/20 to-indigo-600/20',
  },
  {
    code: `pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'npm build' }
    }
  }
}`,
    language: 'groovy',
    color: 'from-red-500/20 to-red-600/20',
  },
  {
    code: `#!/bin/bash
for pod in $(kubectl get pods); do
  kubectl logs $pod
done`,
    language: 'bash',
    color: 'from-green-500/20 to-green-600/20',
  },
];

export default function FloatingCodeSnippets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeSnippets.map((snippet, index) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 20 + Math.random() * 20;
        const delay = index * 2;

        return (
          <motion.div
            key={index}
            initial={{
              x: `${startX}vw`,
              y: `${startY}vh`,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: [`${startX}vw`, `${(startX + 50) % 100}vw`, `${startX}vw`],
              y: [`${startY}vh`, `${(startY + 30) % 100}vh`, `${startY}vh`],
              opacity: [0, 0.7, 0.7, 0],
              scale: [0.8, 1, 1, 0.8],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
          >
            <div className={`glass-card p-3 backdrop-blur-md bg-gradient-to-br ${snippet.color} border border-white/10 rounded-lg shadow-2xl max-w-xs`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{snippet.language}</span>
              </div>
              <pre className="text-[10px] text-gray-300 font-mono leading-tight overflow-hidden">
                {snippet.code}
              </pre>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
