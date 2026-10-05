/** @type {import('next').NextConfig} */

const BACKEND_IP = process.env.NEXT_PUBLIC_BACKEND_IP;
const BACKEND_PORT = process.env.BACKEND_PORT;

const nextConfig = {
  reactCompiler: false,

  devIndicators: false,

  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
  ],

  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${BACKEND_IP}:${BACKEND_PORT}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;