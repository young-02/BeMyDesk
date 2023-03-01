/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'shopping-phinf.pstatic.net'],
  },
};

module.exports = nextConfig;
