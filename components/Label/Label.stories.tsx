import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";
import { AddIcon } from "../Icon/AddIcon";

const meta: Meta<typeof Label> = {
  component: Label,
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Add: Story = {
  args: {
    text: "Add",
    children: <AddIcon />,
  },
};

export const Warning: Story = {
  args: {
    text: "Add",
    children: <AddIcon />,
    variant: "warning",
  },
};
