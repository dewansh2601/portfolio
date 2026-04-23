// ============================================
// Root Layout - Portfolio Application
// Handles global metadata and font loading
// ============================================

import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import './globals.css';

// Courier Prime — terminal slab-serif monospace (matches reference design)
const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
  display: 'swap',
  preload: true,
  fallback: ['Courier New', 'Courier', 'monospace'],
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
    icon: process.env.NODE_ENV === 'production' ? '/portfolio/favicon.svg' : '/favicon.svg',
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
                'https://www.linkedin.com/in/dewansh-mis/',
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
      <body className={`${courierPrime.variable} animated-gradient min-h-screen`}>
        {/* Main content wrapper */}
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
