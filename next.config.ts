/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Permite todos os caminhos do Cloudinary
      },
    ],
  },
};

export default nextConfig;
