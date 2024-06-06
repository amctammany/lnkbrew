import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "./ToggleButton";
import { CloseIcon } from "../Icon/CloseIcon";
import { AddIcon } from "../Icon/AddIcon";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
};
export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {
  args: {
    activeIcon: AddIcon,
    defaultIcon: CloseIcon,
  },
};

export const Active: Story = {
  args: {
    activeIcon: AddIcon,
    defaultIcon: CloseIcon,
    active: true,
  },
};
