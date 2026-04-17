// ============================================
// Main Portfolio Page
// Assembles all components into the complete
// single-page portfolio application
// ============================================

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import DevOpsFlow from '@/components/DevOpsFlow';
import TechArsenal from '@/components/TechArsenal';
import Projects from '@/components/Projects';
import InfraStatus from '@/components/InfraStatus';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import VisualEffectsLayer from '@/components/VisualEffectsLayer';
import PageIntro from '@/components/PageIntro';

export default function Home() {
  return (
    <>
      <PageIntro />

      {/* Device-aware visual effects (3D and cursor layers) */}
      <VisualEffectsLayer />

      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <Hero />
      <About />
      <DevOpsFlow />
      <TechArsenal />
      <Projects />
      <InfraStatus />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
