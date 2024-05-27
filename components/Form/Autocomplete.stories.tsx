// Replace your-renderer with the renderer you are using (e.g., react, vue3, etc.)
import type { Meta, StoryObj } from "@storybook/react";

import { Autocomplete, Option } from "./Autocomplete";
const options: Record<number, string> = Object.fromEntries(
  Object.entries([
    "hey",
    "hi",
    "you",
    "your",
    "heere",
    "guys",
    "girls",
    "gurls",
  ])
);
const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  decorators: [
    (Story) => (
      <div className="flex justify-center h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Basic: Story = { args: { options } };

export const Primary: Story = {
  args: {
    name: "hi",
    options,
  },
};
