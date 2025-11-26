# Dewansh Mishra - DevOps & Cloud Engineer Portfolio

A modern, animated personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Preview](./preview.png)

## ✨ Features

- **Modern Dark Theme** - Neon blue/purple accents with glassmorphism effects
- **Smooth Animations** - Framer Motion powered scroll and hover animations
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **TypeScript** - Full type safety with reusable interfaces
- **Performance Optimized** - Next.js 14 with image optimization
- **SEO Ready** - Meta tags and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main portfolio page
│   ├── components/
│   │   ├── Navbar.tsx       # Sticky navigation
│   │   ├── Hero.tsx         # Hero section with floating icons
│   │   ├── About.tsx        # Bio and journey timeline
│   │   ├── Skills.tsx       # Skills badges by category
│   │   ├── Projects.tsx     # Project cards with tilt effect
│   │   ├── Experience.tsx   # Work experience timeline
│   │   ├── Certifications.tsx # Certification badges
│   │   ├── Contact.tsx      # Contact form and social links
│   │   └── Footer.tsx       # Footer with social icons
│   ├── data/
│   │   └── index.ts         # All portfolio content data
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── public/
│   └── resume.pdf           # Your resume (add this)
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎨 Customization

### Update Personal Information

Edit `src/data/index.ts` to customize:

- **aboutData** - Name, title, bio, journey
- **skills** - Your technical skills
- **projects** - Your projects with descriptions
- **experiences** - Work experience timeline
- **certifications** - Your certifications
- **socialLinks** - Social media URLs

### Modify Theme Colors

Edit `tailwind.config.ts` to change:

```typescript
colors: {
  neon: {
    blue: '#00d4ff',    // Primary accent
    purple: '#a855f7',  // Secondary accent
    pink: '#f472b6',    // Tertiary accent
  },
}
```

### Add Custom Fonts

1. Update `globals.css` with new font imports
2. Modify `tailwind.config.ts` fontFamily settings

## 🧩 Components Overview

### Hero Section
- Animated text reveal
- Floating tech icons (AWS, Docker, K8s, etc.)
- Gradient background with particle effects
- CTA buttons (Resume download, Contact)

### About Section
- Glassmorphism bio card
- Journey timeline with animations
- Contact quick info

### Skills Section
- Categorized skill badges
- Icons for each technology
- Proficiency indicators
- Scroll-triggered animations

### Projects Section
- Glassmorphism cards
- 3D tilt effect on hover
- Technology tags
- GitHub links

### Experience Timeline
- Vertical timeline
- Alternating layout
- Achievement bullets
- Technology tags

### Certifications
- Badge carousel
- Credly integration
- Verification links

### Contact Section
- Glassmorphism form
- Form validation
- Social media links
- Success/error states

## 🔧 Technical Details

### Dependencies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **react-icons** - Icon library

### Key Features Implementation

- **Glassmorphism**: `bg-white/5 backdrop-blur-md border border-white/10`
- **Neon Glow**: `box-shadow: 0 0 20px rgba(0, 212, 255, 0.5)`
- **Smooth Scroll**: `scroll-behavior: smooth` in CSS
- **Tilt Effect**: Custom mouse tracking in ProjectCard component

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run export  # If static export needed
```

## 📄 License

MIT License - Feel free to use for your own portfolio!

## 🤝 Credits

- Design inspiration: Modern portfolio trends
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Fonts: [Google Fonts](https://fonts.google.com/) (Orbitron, Rajdhani, JetBrains Mono)

---

**Built with ❤️ by Dewansh Mishra**

Feel free to reach out if you have questions or want to collaborate!
