/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['firebasestorage.googleapis.com', 'shopping-phinf.pstatic.net'],
  },
};

module.exports = nextConfig;
