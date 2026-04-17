'use client';

// ============================================
// GridBackground — Three.js (Fixed)
// Pixel-exact grid: each cell = CELL_PX × CELL_PX
// Lines built at local x=0 origin; group.position
// handles all world placement → no double-offset bug
// ============================================

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CELL_PX     = 70;      // each cell is exactly this many screen pixels
const SCROLL_PX_S = 14;      // scroll speed: pixels per second
const BG_COLOR    = 0x060606;
const LINE_COLOR  = 0x1c1c1c;

export default function GridBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* pixel → world conversion (1 world-unit = 100px) */
    const SCALE = 100;
    const toW   = (px: number) => px / SCALE;

    const cellSize    = toW(CELL_PX);
    const scrollSpeed = toW(SCROLL_PX_S);

    /* ── Renderer ──────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(BG_COLOR, 1);
    mount.appendChild(renderer.domElement);

    /* ── Scene ─────────────────────────────── */
    const scene = new THREE.Scene();

    /* ── Camera (pixel-exact ortho) ─────────── 
     *  frustum = actual viewport size in world units,
     *  so 1 world-unit always = SCALE pixels.
     */
    let FW = toW(mount.clientWidth);
    let FH = toW(mount.clientHeight);

    const camera = new THREE.OrthographicCamera(
      -FW / 2, FW / 2,
       FH / 2, -FH / 2,
      -1, 1,
    );

    /* ── Line material ──────────────────────── */
    const lineMat = new THREE.LineBasicMaterial({ color: LINE_COLOR });

    const makeLine = (x0: number, y0: number, x1: number, y1: number) => {
      const pts = [new THREE.Vector3(x0, y0, 0), new THREE.Vector3(x1, y1, 0)];
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        lineMat,
      );
    };

    /* ── Horizontal lines ───────────────────── 
     * Static: span ±500 world units wide (always covers any viewport).
     * One line at each row boundary, centred on camera.
     */
    const buildHLines = () => {
      const g        = new THREE.Group();
      const rowCount = Math.ceil(FH / cellSize) + 2; // +2 buffer rows
      const topY     = Math.ceil(FH / 2 / cellSize) * cellSize + cellSize;
      for (let r = 0; r <= rowCount; r++) {
        const y = topY - r * cellSize;
        g.add(makeLine(-500, y, 500, y));
      }
      return g;
    };

    const hLines = buildHLines();
    scene.add(hLines);

    /* ── Vertical line strips ───────────────── 
     * Two identical strips, lines built from LOCAL x = 0.
     * group.position.x is the only thing that moves them.
     *
     * stripW must be >> FW so the seam is always off-screen.
     */
    const STRIP_COLS = Math.ceil(FW / cellSize) * 3 + 6;
    const stripW     = STRIP_COLS * cellSize;
    const BIG_H      = 500; // tall enough to always cover the viewport

    const buildVStrip = () => {
      const g = new THREE.Group();
      for (let c = 0; c <= STRIP_COLS; c++) {
        const x = c * cellSize; // LOCAL position — starts at 0
        g.add(makeLine(x, -BIG_H / 2, x, BIG_H / 2));
      }
      return g;
    };

    const stripA = buildVStrip();
    const stripB = buildVStrip();
    scene.add(stripA, stripB);

    /* Initial placement
     *  Strip A: group.position.x = -FW/2  → left edge aligns to camera left
     *  Strip B: group.position.x = -FW/2 - stripW  → one full strip to the left (off-screen)
     * As offset increases, both move right; when offset hits stripW we reset.
     */
    const setStripPositions = (offset: number) => {
      stripA.position.x = -FW / 2 + offset;
      stripB.position.x = -FW / 2 + offset - stripW;
    };
    setStripPositions(0);

    /* ── Mouse glow sprite ──────────────────── */
    const cv  = document.createElement('canvas');
    cv.width  = cv.height = 256;
    const ctx = cv.getContext('2d')!;
    const gr  = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0.00, 'rgba(34,197,94,0.30)');
    gr.addColorStop(0.30, 'rgba(34,197,94,0.11)');
    gr.addColorStop(0.65, 'rgba(34,197,94,0.03)');
    gr.addColorStop(1.00, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, 256, 256);

    const glowTex = new THREE.CanvasTexture(cv);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0,
    });
    const glowSize = cellSize * 4;
    const glow     = new THREE.Sprite(glowMat);
    glow.scale.set(glowSize, glowSize, 1);
    scene.add(glow);

    const mouseTarget = new THREE.Vector3();
    const glowCurrent = new THREE.Vector3();
    let   glowOn = false;

    const onMove = (e: MouseEvent) => {
      glowOn = true;
      const r  = mount.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width  - 0.5;
      const ny = (e.clientY - r.top)  / r.height - 0.5;
      mouseTarget.set(nx * FW, -ny * FH, 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', () => { glowOn = false; });

    /* ── Resize ─────────────────────────────── */
    const onResize = () => {
      FW = toW(mount.clientWidth);
      FH = toW(mount.clientHeight);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.left   = -FW / 2;
      camera.right  =  FW / 2;
      camera.top    =  FH / 2;
      camera.bottom = -FH / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize, { passive: true });

    /* ── Render loop ────────────────────────── */
    let raf    = 0;
    let prev   = performance.now();
    let offset = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      offset += scrollSpeed * dt;
      if (offset >= stripW) offset -= stripW;

      setStripPositions(offset);

      // Mouse glow
      glowCurrent.lerp(mouseTarget, 0.06);
      glow.position.set(glowCurrent.x, glowCurrent.y, 0.5);
      glowMat.opacity += ((glowOn ? 1 : 0) - glowMat.opacity) * 0.07;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    /* ── Cleanup ────────────────────────────── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      lineMat.dispose();
      glowTex.dispose();
      glowMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
