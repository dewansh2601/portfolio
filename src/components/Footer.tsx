'use client';

// ============================================
// Footer Component
// Features: Minimal design, social icons with
// hover glow animation, and copyright info
// ============================================

import { motion } from 'framer-motion';
import { socialLinks, aboutData } from '@/data';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

// Icon mapping
const iconComponents: { [key: string]: React.ElementType } = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            className="font-display text-2xl font-bold text-gradient"
          >
            DM<span className="text-neon-blue">.</span>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const IconComponent = iconComponents[link.icon];
              
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-dark-700/50 flex items-center justify-center text-gray-400 hover:text-neon-blue hover:shadow-neon-blue transition-all duration-300"
                  title={link.name}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                </motion.a>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href="#home" className="hover:text-neon-blue transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-neon-blue transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-neon-blue transition-colors">
              Projects
            </a>
            <a href="#contact" className="hover:text-neon-blue transition-colors">
              Contact
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-1">
              Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart className="w-3 h-3 text-neon-pink" />
              </motion.span>{' '}
              by {aboutData.name}
            </p>
            <p className="mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Tech stack credit */}
          <p className="text-xs text-gray-600">
            Built with Next.js, TypeScript, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
