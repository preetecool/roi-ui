import bundleAnalyzer from "@next/bundle-analyzer";
import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = createMDX();

export default withMDX(withBundleAnalyzer(nextConfig));
