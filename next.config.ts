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
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    },
    incomingRequests: {
      /* não ignorar requisições, logar todas */
      ignore: []
    }
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
