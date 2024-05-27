import type { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "./ToggleButton";

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
};
export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Basic: Story = {
  args: {
    activeIconType: "AddIcon",
    defaultIconType: "CloseIcon",
  },
};

export const Active: Story = {
  args: {
    activeIconType: "AddIcon",
    defaultIconType: "CloseIcon",
    active: true,
  },
};
