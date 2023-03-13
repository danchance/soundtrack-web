/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
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
