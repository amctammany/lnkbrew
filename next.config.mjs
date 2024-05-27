import analyze from "@next/bundle-analyzer";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    /**
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
    */
  },
};

const withBundleAnalyzer = analyze({
  enabled: process.env.ANALYZE === "true",
});
export default withBundleAnalyzer(nextConfig);
