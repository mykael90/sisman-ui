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
  }
};

export default nextConfig;
