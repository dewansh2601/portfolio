'use client';

import { useEffect, useMemo, useState } from 'react';

type DevicePerformanceState = {
  mounted: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  lowCpu: boolean;
  lowMemory: boolean;
  saveData: boolean;
};

const INITIAL_STATE: DevicePerformanceState = {
  mounted: false,
  isMobile: false,
  prefersReducedMotion: false,
  lowCpu: false,
  lowMemory: false,
  saveData: false,
};

export function useDevicePerformance() {
  const [state, setState] = useState<DevicePerformanceState>(INITIAL_STATE);

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: {
        saveData?: boolean;
      };
    };

    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;
    const saveData = Boolean(nav.connection?.saveData);

    setState({
      mounted: true,
      isMobile,
      prefersReducedMotion,
      lowCpu,
      lowMemory,
      saveData,
    });
  }, []);

  return useMemo(() => {
    const reducedEffects =
      state.prefersReducedMotion ||
      state.saveData;

    const allowCore3D = state.mounted && !state.isMobile && !reducedEffects;
    const allowExtra3D = allowCore3D && !state.lowCpu && !state.lowMemory;

    return {
      ...state,
      reducedEffects,
      allowCore3D,
      allowExtra3D,
    };
  }, [state]);
}
