/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverActions: {
    bodySizeLimit: '5mb',
  },
}

export default nextConfig
