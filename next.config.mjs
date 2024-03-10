import analyze from "@next/bundle-analyzer";
/** @type {import('next').NextConfig} */
const nextConfig = {};

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);
