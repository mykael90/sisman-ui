import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sigaa.ufrn.br',
        port: '',
        pathname: '/sigaa/**'
      }
    ]
  }
};

export default nextConfig;
