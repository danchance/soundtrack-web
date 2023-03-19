/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      // Auth0 default profile images
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/**'
      },
      // Spotify images
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
