'use client';

import dynamic from 'next/dynamic';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
  loading: () => null,
});

const NetworkVisualization = dynamic(() => import('@/components/NetworkVisualization'), {
  ssr: false,
  loading: () => null,
});

const MouseTracker3D = dynamic(() => import('@/components/MouseTracker3D'), {
  ssr: false,
  loading: () => null,
});

export default function VisualEffectsLayer() {
  const { mounted, isMobile, reducedEffects, allowCore3D, allowExtra3D } = useDevicePerformance();

  if (!mounted) {
    return null;
  }

  return (
    <>
      {allowCore3D && <ThreeBackground quality={allowExtra3D ? 'high' : 'low'} />}
      {allowExtra3D && <NetworkVisualization />}
      {!isMobile && !reducedEffects && <MouseTracker3D />}
    </>
  );
}
