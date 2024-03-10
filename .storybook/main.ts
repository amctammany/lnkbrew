import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@tomfreudenberg/next-auth-mock/storybook",
    //"storybook-addon-next-router",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: { builder: {} },
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config, { configType }) => {
    if (!config.resolve) {
      return config;
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../"),
    };

    return config;
  },
};
export default config;
