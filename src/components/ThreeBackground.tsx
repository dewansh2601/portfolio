'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef<THREE.Points>(null);

  // Generate random star positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const octahedronRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 8;
      meshRef.current.rotation.y = Math.sin(t / 4) / 8;
      meshRef.current.position.y = Math.sin(t / 2) / 3;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = Math.sin(t / 3) / 6;
      torusRef.current.rotation.z = Math.cos(t / 3) / 6;
      torusRef.current.position.x = Math.cos(t / 2) * 2;
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.y = t / 2;
      octahedronRef.current.position.z = Math.sin(t) * 2;
    }
  });

  return (
    <>
      {/* Icosahedron */}
      <mesh ref={meshRef} position={[3, 0, -5]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          emissive="#a855f7"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Torus Knot */}
      <mesh ref={torusRef} position={[-3, -2, -8]}>
        <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          emissive="#06b6d4"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Octahedron */}
      <mesh ref={octahedronRef} position={[0, 2, -6]}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#ec4899"
          wireframe
          emissive="#ec4899"
          emissiveIntensity={0.5}
        />
      </mesh>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <StarField />
        <FloatingGeometry />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
