import "../app/globals.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    //actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs", "autodocs", "autodocs"]
};

export default preview;
