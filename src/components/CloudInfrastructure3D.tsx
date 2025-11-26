'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, Box, Cone, Line } from '@react-three/drei';
import * as THREE from 'three';

interface CloudNode {
  position: [number, number, number];
  label: string;
  color: string;
  type: 'compute' | 'storage' | 'network' | 'database';
}

function CloudLayer({ nodes, yOffset }: { nodes: CloudNode[]; yOffset: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t / 8;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {nodes.map((node, index) => (
        <group key={index} position={node.position}>
          {/* Node representation based on type */}
          {node.type === 'compute' && (
            <Box args={[1, 1, 1]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.3}
                wireframe
              />
            </Box>
          )}
          {node.type === 'storage' && (
            <Sphere args={[0.6, 16, 16]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.7}
              />
            </Sphere>
          )}
          {node.type === 'database' && (
            <Cone args={[0.6, 1.2, 8]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.3}
                wireframe
              />
            </Cone>
          )}
          {node.type === 'network' && (
            <group>
              <Sphere args={[0.4, 12, 12]}>
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={0.5}
                />
              </Sphere>
              <Sphere args={[0.6, 12, 12]}>
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.3}
                  wireframe
                />
              </Sphere>
            </group>
          )}

          {/* Label */}
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>

          {/* Pulsing ring effect */}
          <PulsingRing color={node.color} />
        </group>
      ))}
    </group>
  );
}

function PulsingRing({ color }: { color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.3;
      ringRef.current.scale.set(scale, scale, scale);
      ringRef.current.rotation.x = Math.PI / 2;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[1, 0.05, 16, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function DataFlowLines() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        const offset = (t + index * 0.5) % 4;
        line.position.y = -6 + offset * 3;
      });
    }
  });

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      temp.push({
        start: [Math.cos(angle) * 3, -6, Math.sin(angle) * 3] as [number, number, number],
        end: [Math.cos(angle) * 5, 6, Math.sin(angle) * 5] as [number, number, number],
      });
    }
    return temp;
  }, []);

  return (
    <group ref={linesRef}>
      {lines.map((line, index) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];

        return (
          <group key={index}>
            <Line
              points={points}
              color="#00d4ff"
              lineWidth={2}
              transparent
              opacity={0.5}
            />
            {/* Data packet */}
            <mesh position={line.start}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial
                color="#00d4ff"
                emissive="#00d4ff"
                emissiveIntensity={1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function CloudPlatform() {
  const platformRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (platformRef.current) {
      platformRef.current.position.y = Math.sin(t / 2) * 0.3;
    }
  });

  return (
    <mesh ref={platformRef} position={[0, -8, 0]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[8, 10, 0.5, 32]} />
      <meshStandardMaterial
        color="#1a1a24"
        emissive="#a855f7"
        emissiveIntensity={0.1}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function CloudInfrastructure3D() {
  const cloudLayers: { nodes: CloudNode[]; yOffset: number }[] = [
    {
      yOffset: 4,
      nodes: [
        { position: [3, 0, 0], label: 'EC2', color: '#ff9900', type: 'compute' },
        { position: [-3, 0, 0], label: 'Lambda', color: '#ff9900', type: 'compute' },
        { position: [0, 0, 3], label: 'ECS', color: '#ff9900', type: 'compute' },
        { position: [0, 0, -3], label: 'EKS', color: '#326ce5', type: 'compute' },
      ],
    },
    {
      yOffset: 0,
      nodes: [
        { position: [4, 0, 0], label: 'S3', color: '#569a31', type: 'storage' },
        { position: [-4, 0, 0], label: 'EBS', color: '#569a31', type: 'storage' },
        { position: [0, 0, 4], label: 'RDS', color: '#4053d6', type: 'database' },
        { position: [0, 0, -4], label: 'DynamoDB', color: '#4053d6', type: 'database' },
      ],
    },
    {
      yOffset: -4,
      nodes: [
        { position: [3, 0, 3], label: 'VPC', color: '#00d4ff', type: 'network' },
        { position: [-3, 0, -3], label: 'CloudFront', color: '#00d4ff', type: 'network' },
        { position: [3, 0, -3], label: 'Route53', color: '#00d4ff', type: 'network' },
        { position: [-3, 0, 3], label: 'ALB', color: '#00d4ff', type: 'network' },
      ],
    },
  ];

  return (
    <div className="w-full h-[600px] lg:h-[700px]">
      <Canvas camera={{ position: [15, 8, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
        <spotLight
          position={[0, 20, 0]}
          intensity={1.5}
          angle={0.5}
          penumbra={1}
          color="#ffffff"
        />

        {/* Cloud Platform Base */}
        <CloudPlatform />

        {/* Data Flow Lines */}
        <DataFlowLines />

        {/* Cloud Service Layers */}
        {cloudLayers.map((layer, index) => (
          <CloudLayer key={index} nodes={layer.nodes} yOffset={layer.yOffset} />
        ))}

        {/* Central Core */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxDistance={30}
          minDistance={10}
        />
      </Canvas>
    </div>
  );
}
