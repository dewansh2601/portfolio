'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function DockerContainer({ position, label, color, status }: {
  position: [number, number, number];
  label: string;
  color: string;
  status: 'running' | 'pending' | 'stopped';
}) {
  const containerRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (containerRef.current && status === 'running') {
      // Breathing animation for running containers
      const scale = 1 + Math.sin(t * 2) * 0.02;
      containerRef.current.scale.set(scale, scale, scale);
    }

    if (glowRef.current && status === 'running') {
      // Pulsing glow
      const glowScale = 1 + Math.sin(t * 3) * 0.3;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  const statusColors = {
    running: '#00ff88',
    pending: '#ffaa00',
    stopped: '#888888',
  };

  return (
    <group ref={containerRef} position={position}>
      {/* Container body */}
      <RoundedBox args={[1, 1, 1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={status === 'running' ? 0.3 : 0.1}
          metalness={0.6}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </RoundedBox>

      {/* Container glow effect */}
      {status === 'running' && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.2}
          />
        </mesh>
      )}

      {/* Docker logo representation */}
      <Text
        position={[0, 0, 0.51]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        🐳
      </Text>

      {/* Container label */}
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Status indicator */}
      <mesh position={[0.6, 0.6, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={statusColors[status]}
          emissive={statusColors[status]}
          emissiveIntensity={1}
        />
      </mesh>

      {/* Port indicators */}
      <group position={[0, -0.5, 0.51]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[(i - 1) * 0.2, 0, 0]}>
            <circleGeometry args={[0.04, 16]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Pod({ position, podIndex }: { position: [number, number, number]; podIndex: number }) {
  const podRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (podRef.current) {
      podRef.current.rotation.y = t * 0.2 + podIndex;
      podRef.current.position.y = position[1] + Math.sin(t + podIndex) * 0.1;
    }
  });

  const containers = [
    { label: 'nginx', color: '#009639', offset: [0, 0.8, 0] as [number, number, number] },
    { label: 'app', color: '#4078c0', offset: [-0.8, 0, 0] as [number, number, number] },
    { label: 'redis', color: '#dc382d', offset: [0.8, 0, 0] as [number, number, number] },
  ];

  return (
    <group ref={podRef} position={position}>
      {/* Pod boundary (wireframe sphere) */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial
          color="#326ce5"
          emissive="#326ce5"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      {/* Containers in pod */}
      {containers.map((container, index) => (
        <DockerContainer
          key={index}
          position={container.offset}
          label={container.label}
          color={container.color}
          status="running"
        />
      ))}

      {/* Pod label */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.2}
        color="#326ce5"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        POD-{podIndex + 1}
      </Text>

      {/* Kubernetes logo */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        ☸️
      </Text>
    </group>
  );
}

function LoadBalancer() {
  const lbRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lbRef.current) {
      lbRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={lbRef} position={[0, 6, 0]}>
      {/* Load balancer body */}
      <Cylinder args={[1, 1, 0.5, 6]}>
        <meshStandardMaterial
          color="#f39c12"
          emissive="#f39c12"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </Cylinder>

      {/* LB Label */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        Load Balancer
      </Text>

      {/* Traffic indicators */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TrafficFlow({ start, end, delay }: {
  start: [number, number, number];
  end: [number, number, number];
  delay: number;
}) {
  const particleRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) % 4;
    const progress = t / 4;

    if (particleRef.current) {
      particleRef.current.position.x = THREE.MathUtils.lerp(start[0], end[0], progress);
      particleRef.current.position.y = THREE.MathUtils.lerp(start[1], end[1], progress);
      particleRef.current.position.z = THREE.MathUtils.lerp(start[2], end[2], progress);

      // Trail effect
      const scale = 1 - progress * 0.5;
      particleRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

export default function ContainerOrchestration3D() {
  const pods = [
    { position: [-4, 0, 0] as [number, number, number], index: 0 },
    { position: [0, 0, 0] as [number, number, number], index: 1 },
    { position: [4, 0, 0] as [number, number, number], index: 2 },
  ];

  const trafficFlows = pods.flatMap((pod, index) => [
    {
      start: [0, 5.5, 0] as [number, number, number],
      end: pod.position,
      delay: index * 0.8,
    },
  ]);

  return (
    <div className="w-full h-[600px] lg:h-[700px]">
      <Canvas camera={{ position: [8, 8, 12], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, 10, 10]} intensity={0.8} color="#a855f7" />
        <spotLight
          position={[0, 15, 0]}
          intensity={1}
          angle={0.6}
          penumbra={1}
          color="#ffffff"
        />

        {/* Load Balancer */}
        <LoadBalancer />

        {/* Kubernetes Pods */}
        {pods.map((pod) => (
          <Pod key={pod.index} position={pod.position} podIndex={pod.index} />
        ))}

        {/* Traffic flows */}
        {trafficFlows.map((flow, index) => (
          <TrafficFlow
            key={index}
            start={flow.start}
            end={flow.end}
            delay={flow.delay}
          />
        ))}

        {/* Platform base */}
        <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[12, 64]} />
          <meshStandardMaterial
            color="#0a0a0f"
            emissive="#326ce5"
            emissiveIntensity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Grid helper */}
        <gridHelper args={[20, 20, '#326ce5', '#1a1a2e']} position={[0, -3, 0]} />
      </Canvas>
    </div>
  );
}
