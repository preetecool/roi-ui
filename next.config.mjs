import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  experimental: {
    optimizeCss: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
