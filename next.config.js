/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'blog.hoojun.kim'],
    unoptimized: false, // 이미지 최적화 활성화
    formats: ['image/avif', 'image/webp'],
  },
  // 성능 최적화 옵션
  swcMinify: true,
  compiler: {
    // 사용하지 않는 코드 제거
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 페이지 속도 최적화
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // 정적 파일 캐싱 전략
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
