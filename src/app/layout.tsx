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
});

// Modern geometric sans-serif for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Clean sans-serif for body text
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
