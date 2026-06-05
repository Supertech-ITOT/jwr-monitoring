/** @type {import('next').NextConfig} */
const nextConfig = {
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
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
