import type { Meta, StoryObj } from "@storybook/react";

import { RangeSlider } from "./RangeSlider";

const meta: Meta<typeof RangeSlider> = {
  component: RangeSlider,
};
export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Basic: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    //className: "",
  },
};

export const Warning: Story = {
  args: {
    min: 20,
    max: 40,
    step: 2,
  },
};
