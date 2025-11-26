'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

function Server({ position, index, isActive }: { position: [number, number, number]; index: number; isActive: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (lightRef.current && isActive) {
      // Blinking light effect
      const intensity = 0.5 + Math.sin(t * 3 + index) * 0.5;
      (lightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }

    if (meshRef.current) {
      // Slight vibration for active servers
      if (isActive) {
        meshRef.current.position.x = position[0] + Math.sin(t * 10 + index) * 0.01;
      }
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Server chassis */}
      <RoundedBox args={[1.8, 0.25, 0.8]} radius={0.02} smoothness={4}>
        <meshStandardMaterial
          color={isActive ? '#1a1a2e' : '#0f0f1a'}
          metalness={0.9}
          roughness={0.3}
        />
      </RoundedBox>

      {/* Front panel */}
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[1.7, 0.2, 0.02]} />
        <meshStandardMaterial
          color="#16213e"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Status lights */}
      <mesh ref={lightRef} position={[-0.7, 0, 0.42]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial
          color={isActive ? '#00ff88' : '#ff4444'}
          emissive={isActive ? '#00ff88' : '#ff4444'}
          emissiveIntensity={isActive ? 1 : 0.3}
        />
      </mesh>

      {/* Activity indicators */}
      {isActive && (
        <>
          <mesh position={[-0.5, 0, 0.42]}>
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#00d4ff"
              emissiveIntensity={0.8}
            />
          </mesh>
          <mesh position={[-0.3, 0, 0.42]}>
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial
              color="#ffaa00"
              emissive="#ffaa00"
              emissiveIntensity={0.8}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

function ServerRack({ position, rackIndex }: { position: [number, number, number]; rackIndex: number }) {
  const servers = useMemo(() => {
    const serverList = [];
    for (let i = 0; i < 16; i++) {
      serverList.push({
        position: [position[0], position[1] + i * 0.3 - 2.4, position[2]] as [number, number, number],
        isActive: Math.random() > 0.2, // 80% active
      });
    }
    return serverList;
  }, [position]);

  return (
    <group>
      {/* Rack frame */}
      <mesh position={position}>
        <boxGeometry args={[2, 5, 1]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Servers */}
      {servers.map((server, index) => (
        <Server
          key={index}
          position={server.position}
          index={index + rackIndex * 16}
          isActive={server.isActive}
        />
      ))}

      {/* Rack label */}
      <Text
        position={[position[0], position[1] + 3, position[2]]}
        fontSize={0.2}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        RACK-{rackIndex + 1}
      </Text>
    </group>
  );
}

function DataStream({ start, end, delay }: { start: [number, number, number]; end: [number, number, number]; delay: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 30;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      pos[i * 3] = THREE.MathUtils.lerp(start[0], end[0], t);
      pos[i * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], t);
      pos[i * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], t);
    }
    return pos;
  }, [start, end]);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() + delay) % 3;
    const progress = t / 3;

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const particleProgress = ((i / particleCount) + progress) % 1;
        positions.array[i * 3] = THREE.MathUtils.lerp(start[0], end[0], particleProgress);
        positions.array[i * 3 + 1] = THREE.MathUtils.lerp(start[1], end[1], particleProgress);
        positions.array[i * 3 + 2] = THREE.MathUtils.lerp(start[2], end[2], particleProgress);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00ff88"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function NetworkSwitch({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      <RoundedBox args={[2, 0.4, 1]} radius={0.05} smoothness={4} ref={meshRef}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </RoundedBox>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.15}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        CORE SWITCH
      </Text>
    </group>
  );
}

export default function ServerRacks3D() {
  const racks = [
    { position: [-3, 0, 0] as [number, number, number], index: 0 },
    { position: [0, 0, 0] as [number, number, number], index: 1 },
    { position: [3, 0, 0] as [number, number, number], index: 2 },
  ];

  const dataStreams = [
    { start: [-3, -2, 0.5] as [number, number, number], end: [0, -3.5, 1.5] as [number, number, number], delay: 0 },
    { start: [0, -2, 0.5] as [number, number, number], end: [0, -3.5, 1.5] as [number, number, number], delay: 0.5 },
    { start: [3, -2, 0.5] as [number, number, number], end: [0, -3.5, 1.5] as [number, number, number], delay: 1 },
    { start: [0, -3.5, 1.5] as [number, number, number], end: [-3, 2, 0.5] as [number, number, number], delay: 1.5 },
    { start: [0, -3.5, 1.5] as [number, number, number], end: [3, 2, 0.5] as [number, number, number], delay: 2 },
  ];

  return (
    <div className="w-full h-[500px] lg:h-[600px]">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[5, 0, 5]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-5, 0, 5]} intensity={0.5} color="#ff4444" />

        {/* Server Racks */}
        {racks.map((rack) => (
          <ServerRack key={rack.index} position={rack.position} rackIndex={rack.index} />
        ))}

        {/* Network Switch */}
        <NetworkSwitch position={[0, -3.5, 1.5]} />

        {/* Data Streams */}
        {dataStreams.map((stream, index) => (
          <DataStream
            key={index}
            start={stream.start}
            end={stream.end}
            delay={stream.delay}
          />
        ))}

        {/* Floor */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 10]} />
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Background panels */}
        <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
          <planeGeometry args={[15, 10]} />
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.5}
            roughness={0.5}
            opacity={0.5}
            transparent
          />
        </mesh>
      </Canvas>
    </div>
  );
}
