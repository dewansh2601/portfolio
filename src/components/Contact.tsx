'use client';

// ============================================
// Contact Section Component
// Features: Glassmorphism form, social links,
// form validation, and animated elements
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { socialLinks, aboutData } from '@/data';
import { 
  FaGithub, FaLinkedin, FaTwitter, FaEnvelope, 
  FaPaperPlane, FaMapMarkerAlt 
} from 'react-icons/fa';

// Icon mapping for social links
const iconComponents: { [key: string]: React.ElementType } = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss DevOps solutions? Let's connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Quick contact info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-white">
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <a
                  href={`mailto:${aboutData.email}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-neon-blue transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center group-hover:border-neon-blue/50 transition-colors">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <span>{aboutData.email}</span>
                </a>

                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-lg bg-dark-700 border border-white/10 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <span>{aboutData.location}</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-white">
                Connect With Me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const IconComponent = iconComponents[link.icon];
                  
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-lg glass-card flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-all duration-300 hover:shadow-neon-blue/20 hover:shadow-lg"
                      title={link.name}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Decorative quote */}
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 border-l-4 border-neon-purple"
            >
              <p className="text-gray-300 italic">
                "Automating today's problems to build tomorrow's solutions."
              </p>
              <p className="text-neon-purple text-sm mt-2">— DevOps Philosophy</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 space-y-6"
            >
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full btn-primary flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
