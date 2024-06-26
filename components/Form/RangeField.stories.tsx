import type { Meta, StoryObj } from "@storybook/react";

import { RangeField } from "./RangeField";

const meta: Meta<typeof RangeField> = {
  component: RangeField,
};
export default meta;

type Story = StoryObj<typeof RangeField>;

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
