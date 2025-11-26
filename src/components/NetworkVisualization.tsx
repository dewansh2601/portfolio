'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
}

function NetworkNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Create network nodes
  const nodes = useMemo<Node[]>(() => {
    const temp: Node[] = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        color: ['#00d4ff', '#a855f7', '#f472b6', '#22d3ee'][Math.floor(Math.random() * 4)],
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position;
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // Update node positions
    nodes.forEach((node, i) => {
      // Apply velocity
      node.position.add(node.velocity);

      // Bounce off boundaries
      if (Math.abs(node.position.x) > 10) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 10) node.velocity.z *= -1;

      positions.setXYZ(i, node.position.x, node.position.y, node.position.z);
    });

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);

        if (distance < 5) {
          // Add line
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );

          // Color based on distance (closer = brighter)
          const opacity = 1 - distance / 5;
          const color = new THREE.Color('#00d4ff');
          lineColors.push(color.r, color.g, color.b, opacity);
          lineColors.push(color.r, color.g, color.b, opacity);
        }
      }
    }

    positions.needsUpdate = true;

    // Update line geometry
    if (linePositions.length > 0) {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      linesRef.current.geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(lineColors, 4)
      );
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });
    return positions;
  }, [nodes]);

  return (
    <>
      {/* Network nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          color="#00d4ff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Network connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

function DataFlow() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 200;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const radius = 8;
      positions[i * 3] = Math.cos(t * Math.PI * 4) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 20;
      positions[i * 3 + 2] = Math.sin(t * Math.PI * 4) * radius;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const y = positions.array[i3 + 1] as number;

      if (y > 10) {
        positions.array[i3 + 1] = -10;
      } else {
        positions.array[i3 + 1] = y + 0.05;
      }

      // Add some wave motion
      const offset = Math.sin(time + i * 0.1) * 0.5;
      positions.array[i3] = (positions.array[i3] as number) + offset * 0.01;
    }

    positions.needsUpdate = true;
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
        size={0.15}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function NetworkVisualization() {
  return (
    <div className="absolute inset-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <NetworkNodes />
        <DataFlow />
      </Canvas>
    </div>
  );
}
