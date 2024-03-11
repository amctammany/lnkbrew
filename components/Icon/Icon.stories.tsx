import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";
import { AddIcon, DeleteIcon } from "../Icon";
import { XMarkIcon, XCircleIcon } from "@heroicons/react/24/solid";

const meta: Meta<typeof Icon> = {
  component: Icon,
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    children: "Basic",
    Svg: XMarkIcon,
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
    Svg: XCircleIcon,
  },
};
