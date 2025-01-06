import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  reactStrictMode: false, // Nonaktifkan Strict Mode
  swcMinify: true,
  transpilePackages: ["@plaiceholder/next"],
  images: {
    remotePatterns: [{ hostname: "**", protocol: "https", port: "" }],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPlaiceholder(nextConfig);
