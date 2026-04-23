// ============================================
// Portfolio Data - Dewansh Mishra
// DevOps & Cloud Engineer
// ============================================

import {
  AboutData,
  Skill,
  Project,
  Experience,
  Certification,
  SocialLink,
  NavItem,
  FloatingIcon,
} from '@/types';

// Navigation items
export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Pipeline', href: '#devopsflow' },
  { label: 'Arsenal', href: '#techarsenal' },
  { label: 'Projects', href: '#projects' },
  { label: 'Infra', href: '#infrastatus' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

// About section data
export const aboutData: AboutData = {
  name: 'Dewansh Mishra',
  title: 'DevOps & Cloud Engineer',
  bio: `Passionate DevOps & Cloud Engineer with expertise in building scalable,
  secure, and automated cloud infrastructure. I specialize in CI/CD pipelines,
  containerization, and infrastructure as code. My journey from BSc CS through MCA
  and specialized IACSD (DITISS) training to DevOps has equipped me with a strong
  foundation in both development and operations, enabling me to bridge the gap between
  software development and IT operations.`,
  journey: [
    {
      period: '2018 - 2021',
      title: 'Bachelor of Science in Computer Science (BSc CS)',
      institution: 'Pt. S.N. Shukla University , Shahdol MP',
      description: 'Built strong foundation in computer science fundamentals, programming, and core IT concepts.',
    },
    {
      period: '2021 - 2023',
      title: 'Master of Computer Applications (MCA)',
      institution: 'Madhav Institute of Technology and Science, Gwalior MP',
      description: 'Advanced studies in software development, system design, and enterprise application development.',
    },
    {
      period: 'Aug 2024 - Mar 2025',
      title: 'PG Diploma in IT Infrastructure & Security (DITISS)',
      institution: 'IACSD Pune MH',
      description: 'Specialized in cybersecurity, network infrastructure, and cloud computing. Gained hands-on experience with enterprise-grade tools and technologies.',
    },
  ],
  email: 'dewanshmishra01@gmail.com',
  location: 'Pune, India',
  resumeUrl: '/resume.pdf',
};

// Skills data with proficiency levels
export const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: 'AWS', icon: 'FaAws', category: 'Cloud & Infrastructure', proficiency: 85 },
  { name: 'Terraform', icon: 'SiTerraform', category: 'Cloud & Infrastructure', proficiency: 80 },
  { name: 'Linux', icon: 'FaLinux', category: 'Cloud & Infrastructure', proficiency: 90 },

  // Containerization & Orchestration
  { name: 'Docker', icon: 'FaDocker', category: 'Containerization & Orchestration', proficiency: 88 },
  { name: 'Kubernetes', icon: 'SiKubernetes', category: 'Containerization & Orchestration', proficiency: 75 },

  // CI/CD & Automation
  { name: 'GitHub Actions', icon: 'SiGithubactions', category: 'CI/CD & Automation', proficiency: 85 },
  { name: 'Jenkins', icon: 'SiJenkins', category: 'CI/CD & Automation', proficiency: 78 },
  { name: 'GitLab CI', icon: 'SiGitlab', category: 'CI/CD & Automation', proficiency: 70 },

  // Programming & Scripting
  { name: 'Python', icon: 'FaPython', category: 'Programming & Scripting', proficiency: 82 },
  { name: 'Bash', icon: 'SiGnubash', category: 'Programming & Scripting', proficiency: 85 },
  { name: 'YAML', icon: 'SiYaml', category: 'Programming & Scripting', proficiency: 90 },

  // Security & Monitoring
  { name: 'Trivy', icon: 'FaShieldAlt', category: 'Security & Monitoring', proficiency: 75 },
  { name: 'OWASP ZAP', icon: 'SiOwasp', category: 'Security & Monitoring', proficiency: 72 },
  { name: 'Git', icon: 'FaGitAlt', category: 'Security & Monitoring', proficiency: 90 },
];

// Projects data
export const projects: Project[] = [
  {
    id: 'kicksnap-eks',
    title: 'Kicksnap Production EKS & Istio',
    description: 'Configured EKS + Istio production stack with AWS Global Accelerator across 3 regions (us-east-1, ap-northeast-1, ap-east-1); resolved ALB health check misconfiguration restoring GA endpoint health.',
    tags: ['EKS', 'Istio', 'Global Accelerator', 'AWS'],
    featured: true,
  },
  {
    id: 'organoptima-hipaa',
    title: 'OrganOptima HIPAA Audit Pipeline',
    description: 'Designed HIPAA-compliant audit log pipeline (CloudWatch → Kinesis Firehose → S3 → Glacier Deep Archive) with KMS encryption and Athena querying for healthcare client.',
    tags: ['AWS', 'CloudWatch', 'Kinesis', 'Athena', 'HIPAA'],
    featured: true,
  },
  {
    id: 'arm64-build-opt',
    title: 'ARM64 Docker Build Optimization',
    description: 'Cut Docker build times from 24+ min to ~4 min by designing a hybrid ARM64 build strategy on GitHub Actions for a NestJS monorepo (3 apps).',
    tags: ['GitHub Actions', 'Docker', 'ARM64', 'CI/CD'],
    featured: true,
  },
  {
    id: 'infra-automation',
    title: 'Infrastructure Automation',
    description: 'Terraform modules for AWS infrastructure including VPC, EC2, S3, and security configurations with HIPAA compliance considerations.',
    tags: ['Terraform', 'AWS', 'IaC', 'VPC', 'Security'],
    githubUrl: 'https://github.com/dewansh2601/terraform-aws',
    featured: true,
  },
  {
    id: 'ip-geolocation',
    title: 'IP Geolocation Tracker',
    description: 'A Flask-based web application that tracks and displays geolocation information for any IP address. Features interactive maps and detailed location data.',
    tags: ['Flask', 'Python', 'REST API', 'Geolocation', 'Bootstrap'],
    githubUrl: 'https://github.com/dewansh2601/ip-geolocation',
    featured: false,
  },
  {
    id: 'dns-lookup',
    title: 'DNS to IP Lookup Tool',
    description: 'Command-line and web-based tool for resolving domain names to IP addresses with additional DNS record information.',
    tags: ['Python', 'DNS', 'CLI', 'Flask', 'Network'],
    githubUrl: 'https://github.com/dewansh2601/dns-lookup',
    featured: false,
  },
  {
    id: 'cicd-pipelines',
    title: 'CI/CD Pipeline Templates',
    description: 'Collection of production-ready CI/CD pipeline templates for various tech stacks including React, Java, Python with integrated security scanning.',
    tags: ['GitHub Actions', 'Jenkins', 'Docker', 'Trivy', 'OWASP ZAP'],
    githubUrl: 'https://github.com/dewansh2601/cicd-templates',
    featured: false,
  },
];

// Experience timeline data
export const experiences: Experience[] = [
  {
    id: 'mindbowser',
    period: 'June 2024 - Present',
    title: 'Associate DevOps Engineer',
    company: 'Mindbowser Inc.',
    location: 'Pune, India',
    description: 'Architecting and managing production cloud infrastructure on AWS, building DevSecOps pipelines, and leading containerization initiatives for healthcare and SaaS clients.',
    achievements: [
      'Cut Docker build times from 24+ min to ~4 min by designing a hybrid ARM64 build strategy on GitHub Actions for a NestJS monorepo (3 apps)',
      'Configured EKS + Istio production stack with AWS Global Accelerator across 3 regions (us-east-1, ap-northeast-1, ap-east-1); resolved ALB health check misconfiguration restoring GA endpoint health',
      'Designed HIPAA-compliant audit log pipeline (CloudWatch → Kinesis Firehose → S3 → Glacier Deep Archive) with KMS encryption and Athena querying for healthcare client',
      'Integrated DevSecOps pipeline (Trivy, SonarQube, Gitleaks, OWASP ZAP, OSV Scanner) with toggle flag for scan control; fixed CloudFront/SonarQube HTTP/2 stream reset by routing DNS directly to EC2',
    ],
    technologies: ['AWS EKS', 'Istio', 'Terraform', 'Docker', 'GitHub Actions', 'Global Accelerator', 'CloudWatch', 'Python'],
  },
];

// Certifications data
export const certifications: Certification[] = [
  {
    id: 'aws-clf',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    credlyBadgeUrl: 'https://www.credly.com/badges/ebaecc63-a038-4949-bcc7-4bfc81aa70ba/public_url',
    verificationUrl: 'https://www.credly.com/badges/ebaecc63-a038-4949-bcc7-4bfc81aa70ba/public_url',
    imageUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
  },
  {
    id: 'nptel-cloud',
    name: 'Cloud Computing',
    issuer: 'NPTEL (IIT Kharagpur)',
    date: '2023',
    credlyBadgeUrl: '',
    verificationUrl: 'https://drive.google.com/file/d/1w8Utb_I6xRGH8kWB7XAofhrtf41AsE88/view?usp=drivesdk',
    imageUrl: process.env.NODE_ENV === 'production' ? '/portfolio/certifications/image.png' : '/certifications/image.png',
  },
];

// Social links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/dewansh2601',
    icon: 'FaGithub',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dewansh-mis/',
    icon: 'FaLinkedin',
  },
  {
    name: 'Email',
    url: 'mailto:dewanshmishra01@gmail.com',
    icon: 'FaEnvelope',
  },
];

// Floating icons configuration for hero section
export const floatingIcons: FloatingIcon[] = [
  { icon: 'FaAws', position: { top: '15%', left: '10%' }, delay: 0, size: '3rem' },
  { icon: 'FaDocker', position: { top: '20%', right: '15%' }, delay: 0.5, size: '2.5rem' },
  { icon: 'SiKubernetes', position: { bottom: '30%', left: '8%' }, delay: 1, size: '2.8rem' },
  { icon: 'FaLinux', position: { top: '40%', right: '10%' }, delay: 1.5, size: '2.5rem' },
  { icon: 'SiTerraform', position: { bottom: '20%', right: '20%' }, delay: 2, size: '2.3rem' },
  { icon: 'SiJenkins', position: { top: '60%', left: '15%' }, delay: 2.5, size: '2.2rem' },
  { icon: 'FaPython', position: { bottom: '15%', left: '25%' }, delay: 3, size: '2.4rem' },
];
