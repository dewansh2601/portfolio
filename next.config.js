/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',

  // Custom domain = no basePath needed
  basePath: '',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;