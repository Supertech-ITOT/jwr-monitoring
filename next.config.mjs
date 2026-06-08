/** @type {import('next').NextConfig} */
const BACKEND_IP = process.env.NEXT_PUBLIC_BACKEND_IP;
const BACKEND_PORT = process.env.BACKEND_PORT;
const nextConfig = {
  allowedDevOrigins: [BACKEND_IP],
  reactCompiler: false,
  devIndicators: false,
  output: "export",
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
