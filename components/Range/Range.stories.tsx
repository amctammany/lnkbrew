import type { Meta, StoryObj } from "@storybook/react";

import { Range } from "./Range";

const meta: Meta<typeof Range> = {
  component: Range,
};
export default meta;

type Story = StoryObj<typeof Range>;

export const Basic: Story = {
  args: {
    min: 0,
    max: 100,
    range: [14, 55],
    //className: "",
  },
};

export const Warning: Story = {
  args: {
    min: 20,
    max: 40,
    range: [24, 35],
  },
};
