'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { FaAws, FaDocker, FaPython, FaGitAlt, FaLinux } from 'react-icons/fa';
import { SiKubernetes, SiTerraform, SiJenkins, SiGithubactions } from 'react-icons/si';

interface LogoFaceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  Icon: React.ElementType;
  color: string;
}

function LogoFace({ position, rotation, Icon, color }: LogoFaceProps) {
  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      occlude
      style={{
        transition: 'all 0.3s',
        opacity: 0.9,
      }}
    >
      <div className="flex items-center justify-center w-32 h-32">
        <Icon className="w-20 h-20" style={{ color }} />
      </div>
    </Html>
  );
}

function RotatingCube() {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t / 4) * 0.2 + t / 8;
      groupRef.current.rotation.y = Math.cos(t / 4) * 0.2 + t / 6;
      groupRef.current.position.y = Math.sin(t / 2) * 0.3;
    }

    if (cubeRef.current) {
      // Subtle pulse effect
      const scale = 1 + Math.sin(t * 2) * 0.05;
      cubeRef.current.scale.set(scale, scale, scale);
    }
  });

  const techStack = [
    { position: [0, 0, 2.01] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], Icon: FaAws, color: '#FF9900' },
    { position: [0, 0, -2.01] as [number, number, number], rotation: [0, Math.PI, 0] as [number, number, number], Icon: SiKubernetes, color: '#326CE5' },
    { position: [2.01, 0, 0] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], Icon: FaDocker, color: '#2496ED' },
    { position: [-2.01, 0, 0] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number], Icon: SiTerraform, color: '#7B42BC' },
    { position: [0, 2.01, 0] as [number, number, number], rotation: [-Math.PI / 2, 0, 0] as [number, number, number], Icon: SiJenkins, color: '#D24939' },
    { position: [0, -2.01, 0] as [number, number, number], rotation: [Math.PI / 2, 0, 0] as [number, number, number], Icon: SiGithubactions, color: '#2088FF' },
  ];

  return (
    <group ref={groupRef}>
      {/* Main cube wireframe */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner rotating cube */}
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          emissive="#a855f7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Tech logos on each face */}
      {techStack.map((tech, index) => (
        <LogoFace
          key={index}
          position={tech.position}
          rotation={tech.rotation}
          Icon={tech.Icon}
          color={tech.color}
        />
      ))}

      {/* Orbiting particles */}
      <mesh position={[5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-5, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function NetworkConnections() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.rotation.y = t / 4;
    }
  });

  const connections = [
    [[-6, 0, 0], [6, 0, 0]],
    [[0, -6, 0], [0, 6, 0]],
    [[0, 0, -6], [0, 0, 6]],
    [[-4, -4, 0], [4, 4, 0]],
    [[-4, 4, 0], [4, -4, 0]],
  ];

  return (
    <group ref={linesRef}>
      {connections.map((points, index) => {
        const linePoints = points.map(p => new THREE.Vector3(p[0], p[1], p[2]));

        return (
          <Line
            key={index}
            points={linePoints}
            color="#22d3ee"
            lineWidth={2}
            transparent
            opacity={0.3}
          />
        );
      })}
    </group>
  );
}

export default function DevOpsCube() {
  return (
    <div className="w-full h-[350px] lg:h-[400px]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight position={[0, 15, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#f472b6" />

        <NetworkConnections />
        <RotatingCube />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
