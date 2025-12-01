// ============================================
// Main Portfolio Page
// Assembles all components into the complete
// single-page portfolio application
// ============================================

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Dynamic import for Three.js components with lazy loading for performance
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

export default function Home() {
  return (
    <>
      {/* 3D Background */}
      <ThreeBackground />

      {/* Network Visualization Overlay */}
      <NetworkVisualization />

      {/* Mouse Tracker 3D */}
      <MouseTracker3D />

      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
