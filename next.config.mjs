import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root: a stray package-lock.json in the parent dir makes
  // Turbopack infer /Users/preet/code as root and break module resolution.
  turbopack: {
    root: import.meta.dirname,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
