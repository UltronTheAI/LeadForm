/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // By default, Next.js uses "/" for the base path, which is usually correct
  // If deploying to a subfolder, you would set basePath: '/subfolder'
  // Leave these commented out unless needed
  // basePath: '',
  // trailingSlash: true, // This adds a trailing slash to URLs
  images: {
    unoptimized: true, // For static exports, image optimization needs to be disabled
  },
};

export default nextConfig;
