'use client';

// ============================================
// VisualEffectsLayer
// Mounts the Three.js grid background.
// All other heavy 3D layers are disabled
// so the terminal theme stays clean.
// ============================================

import dynamic from 'next/dynamic';

const GridBackground = dynamic(() => import('@/components/GridBackground'), {
  ssr: false,
  loading: () => null,
});

export default function VisualEffectsLayer() {
  return <GridBackground />;
}
