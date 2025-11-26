'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface PipelineStage {
  position: [number, number, number];
  label: string;
  color: string;
  icon: string;
}

function DataPacket({ startPos, endPos, delay }: { startPos: [number, number, number]; endPos: [number, number, number]; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) % 8;
    const progress = (t / 8);

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(startPos[0], endPos[0], progress);
      meshRef.current.position.y = THREE.MathUtils.lerp(startPos[1], endPos[1], progress) + Math.sin(progress * Math.PI) * 1;
      meshRef.current.position.z = THREE.MathUtils.lerp(startPos[2], endPos[2], progress);

      // Pulse effect
      const scale = 1 + Math.sin(t * 4) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function PipelineStage({ position, label, color, icon, index }: PipelineStage & { index: number }) {
  const boxRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boxRef.current) {
      // Breathing animation
      const scale = 1 + Math.sin(t * 2 + index) * 0.05;
      boxRef.current.scale.set(scale, scale, scale);

      // Slight rotation
      boxRef.current.rotation.y = Math.sin(t + index) * 0.1;
    }
  });

  return (
    <group ref={boxRef} position={position}>
      {/* Stage Box */}
      <RoundedBox args={[2, 1.5, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.6}
          roughness={0.4}
        />
      </RoundedBox>

      {/* Stage Label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>

      {/* Icon/Emoji */}
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.6}
        anchorX="center"
        anchorY="middle"
      >
        {icon}
      </Text>

      {/* Progress indicator */}
      <mesh position={[0, -0.9, 0.51]}>
        <boxGeometry args={[1.8, 0.1, 0.02]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

function ConnectionPipe({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const pipeRef = useRef<THREE.Mesh>(null);

  const length = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
    Math.pow(end[1] - start[1], 2) +
    Math.pow(end[2] - start[2], 2)
  );

  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  ).normalize();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pipeRef.current) {
      // Flowing energy effect through opacity
      const opacity = 0.3 + Math.sin(t * 3) * 0.2;
      (pipeRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
    }
  });

  return (
    <Cylinder
      ref={pipeRef}
      args={[0.1, 0.1, length, 8]}
      position={midpoint}
      rotation={[Math.PI / 2, 0, Math.atan2(direction.z, direction.x)]}
    >
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </Cylinder>
  );
}

function StatusIndicator({ position, status }: { position: [number, number, number]; status: 'success' | 'running' | 'pending' }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const colors = {
    success: '#00ff88',
    running: '#ffaa00',
    pending: '#888888',
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current && status === 'running') {
      meshRef.current.rotation.y = t * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.3, 0.08, 16, 32]} />
      <meshStandardMaterial
        color={colors[status]}
        emissive={colors[status]}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

export default function CICDPipeline3D() {
  const stages: PipelineStage[] = [
    { position: [-8, 0, 0], label: 'Code Commit', color: '#4078c0', icon: '💻' },
    { position: [-4, 0, 0], label: 'Build', color: '#6cc644', icon: '🔨' },
    { position: [0, 0, 0], label: 'Test', color: '#f39c12', icon: '🧪' },
    { position: [4, 0, 0], label: 'Deploy', color: '#9b59b6', icon: '🚀' },
    { position: [8, 0, 0], label: 'Monitor', color: '#e74c3c', icon: '📊' },
  ];

  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < stages.length - 1; i++) {
      conns.push({
        start: stages[i].position,
        end: stages[i + 1].position,
      });
    }
    return conns;
  }, []);

  return (
    <div className="w-full h-[400px] lg:h-[500px]">
      <Canvas camera={{ position: [0, 6, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, 10, 10]} intensity={0.8} color="#a855f7" />
        <spotLight
          position={[0, 10, 5]}
          intensity={1}
          angle={0.6}
          penumbra={1}
          color="#ffffff"
        />

        {/* Pipeline Stages */}
        {stages.map((stage, index) => (
          <PipelineStage key={index} {...stage} index={index} />
        ))}

        {/* Connection Pipes */}
        {connections.map((conn, index) => (
          <ConnectionPipe key={index} start={conn.start} end={conn.end} />
        ))}

        {/* Data Packets flowing through pipeline */}
        {connections.map((conn, index) => (
          <DataPacket
            key={index}
            startPos={conn.start}
            endPos={conn.end}
            delay={index * 1.5}
          />
        ))}

        {/* Status Indicators */}
        <StatusIndicator position={[-8, 1.5, 0]} status="success" />
        <StatusIndicator position={[-4, 1.5, 0]} status="success" />
        <StatusIndicator position={[0, 1.5, 0]} status="running" />
        <StatusIndicator position={[4, 1.5, 0]} status="pending" />
        <StatusIndicator position={[8, 1.5, 0]} status="pending" />

        {/* Background Grid */}
        <gridHelper args={[30, 30, '#222244', '#111122']} position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}
