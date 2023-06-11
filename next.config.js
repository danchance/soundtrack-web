/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      // Auth0 default profile images.
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/**'
      },
      // Spotify images.
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**'
      },
      // Express server images: dev and prod.
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/images/**'
      },
      {
        protocol: 'https',
        hostname: 'api.mysoundtrack.dev',
        pathname: '/images/**'
      }
    ]
  }
};

module.exports = nextConfig;
