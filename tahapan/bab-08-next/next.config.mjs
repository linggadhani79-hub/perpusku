// next.config.mjs
const nextConfig = {
  async rewrites() {
    // /api/... yang tidak ditangani Route Handler Next.js diteruskan ke API Express,
    // sehingga peramban cukup berbicara dengan satu asal (localhost:3001)
    return [{ source: "/api/:path*", destination: `${process.env.API_URL}/api/:path*` }];
  },
};
export default nextConfig;
