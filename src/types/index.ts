// ============================================
// TypeScript Types & Interfaces for Portfolio
// ============================================

// Navigation item type
export interface NavItem {
  label: string;
  href: string;
}

// About section data
export interface AboutData {
  name: string;
  title: string;
  bio: string;
  journey: JourneyItem[];
  email: string;
  location: string;
  resumeUrl: string;
}

// Journey/Education item
export interface JourneyItem {
  period: string;
  title: string;
  institution: string;
  description: string;
}

// Skill category and individual skill
export interface Skill {
  name: string;
  icon: string; // Icon name from react-icons
  category: SkillCategory;
  proficiency: number; // 0-100
}

export type SkillCategory = 
  | 'Cloud & Infrastructure'
  | 'Containerization & Orchestration'
  | 'CI/CD & Automation'
  | 'Programming & Scripting'
  | 'Security & Monitoring';

// Project data
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

// Experience/Timeline item
export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

// Certification data
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credlyBadgeUrl?: string;
  verificationUrl?: string;
  imageUrl: string;
}

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Social link
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Floating icon for hero section
export interface FloatingIcon {
  icon: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  delay: number;
  size: string;
}

// Animation variants for Framer Motion
export interface AnimationVariants {
  hidden: object;
  visible: object;
  hover?: object;
  tap?: object;
}
