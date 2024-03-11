import type { Meta, StoryObj } from "@storybook/react";

import { AppIcon } from "./AppIcon";

const meta: Meta<typeof AppIcon> = {
  component: AppIcon,
};
export default meta;

type Story = StoryObj<typeof AppIcon>;

export const Basic: Story = {
  args: {
    type: "AddIcon",
  },
};

export const Warning: Story = {
  args: {
    type: "CloseIcon",
    variant: "warning",
  },
};
