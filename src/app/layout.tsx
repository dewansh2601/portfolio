// ============================================
// Root Layout - Portfolio Application
// Handles global metadata and font loading
// ============================================

import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

// Professional monospace font for code and technical content
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

// Modern geometric sans-serif for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Clean sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// SEO Metadata for the portfolio
export const metadata: Metadata = {
  title: 'Dewansh Mishra | DevOps & Cloud Engineer',
  description: 'Portfolio of Dewansh Mishra - DevOps & Cloud Engineer specializing in AWS, CI/CD, Docker, Kubernetes, and Infrastructure Automation.',
  keywords: [
    'DevOps Engineer',
    'Cloud Engineer',
    'AWS',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Terraform',
    'GitHub Actions',
    'Infrastructure as Code',
  ],
  authors: [{ name: 'Dewansh Mishra' }],
  icons: {
    icon: '/portfolio/favicon.svg',
  },
  openGraph: {
    title: 'Dewansh Mishra | DevOps & Cloud Engineer',
    description: 'Portfolio showcasing DevOps & Cloud Engineering expertise',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dewansh Mishra | DevOps & Cloud Engineer',
    description: 'Portfolio showcasing DevOps & Cloud Engineering expertise',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Resource hints for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.credly.com" />
        {/* Viewport for proper mobile rendering */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Dewansh Mishra',
              jobTitle: 'DevOps & Cloud Engineer',
              url: 'https://dewansh2601.github.io/portfolio/',
              sameAs: [
                'https://github.com/dewansh2601',
                'https://linkedin.com/in/dewansh-mishra',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Mindbowser Inc.',
              },
              alumniOf: [
                {
                  '@type': 'EducationalOrganization',
                  name: 'Madhav Institute of Technology and Science',
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'IACSD Pune',
                },
              ],
              knowsAbout: [
                'DevOps',
                'Cloud Computing',
                'AWS',
                'Docker',
                'Kubernetes',
                'CI/CD',
                'Terraform',
                'Infrastructure as Code',
              ],
              email: 'dewanshmishra01@gmail.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Pune',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} animated-gradient min-h-screen`}>
        {/* Main content wrapper */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
