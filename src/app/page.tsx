// ============================================
// Main Portfolio Page
// Assembles all components into the complete
// single-page portfolio application
// ============================================

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VisualEffectsLayer from '@/components/VisualEffectsLayer';

export default function Home() {
  return (
    <>
      {/* Device-aware visual effects (3D and cursor layers) */}
      <VisualEffectsLayer />

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
