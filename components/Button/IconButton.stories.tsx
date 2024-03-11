import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    children: "Basic",
    iconType: "AddIcon",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    iconType: "DeleteIcon",
  },
};
