import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./IconButton";
import { AddIcon, DeleteIcon } from "../Icon";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Basic: Story = {
  args: {
    children: "Basic",
    Icon: AddIcon,
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    Icon: DeleteIcon,
  },
};
