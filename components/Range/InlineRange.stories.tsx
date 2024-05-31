import type { Meta, StoryObj } from "@storybook/react";

import { InlineRange } from "./InlineRange";

const meta: Meta<typeof InlineRange> = {
  component: InlineRange,
};
export default meta;

type Story = StoryObj<typeof InlineRange>;

export const Basic: Story = {
  args: {
    label: "Basic",
    value: 30,
    range: [14, 55],
    //className: "",
  },
};
export const Below: Story = {
  args: {
    label: "Below",
    value: 3,
    range: [14, 55],
    //className: "",
  },
};

export const Above: Story = {
  args: {
    label: "Above",
    value: 60,
    range: [14, 55],
    //className: "",
  },
};

export const Warning: Story = {
  args: {
    label: "Warning",
    variant: "warning",
    range: [24, 35],
  },
};
