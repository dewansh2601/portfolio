/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Static export for GitHub Pages
  output: 'export',

  // Base path for GitHub Pages (replace 'portfolio' with your repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',

  // Configure image domains if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
    ],
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
