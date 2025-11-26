'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.x = Math.sin(t / 4) / 4;
      sphereRef.current.rotation.y = t / 3;
      sphereRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00f0ff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#0ea5e9"
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

function ParticleRing() {
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    const angle = (i / 1000) * Math.PI * 2;
    const radius = 3 + Math.random() * 0.5;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t / 4;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function SkillsSphere() {
  return (
    <div className="w-full h-[400px] lg:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
        <AnimatedSphere />
        <ParticleRing />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
