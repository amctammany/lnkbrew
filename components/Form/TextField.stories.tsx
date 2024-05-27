import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";
const meta: Meta<typeof TextField> = {
  component: TextField,
  decorators: [
    (Story) => (
      <div className="flex justify-center h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Basic: Story = { args: { name: "name" } };

export const Primary: Story = {
  args: {
    name: "hi",
  },
};
