import type { Meta, StoryObj } from "@storybook/react";

import { AmountProp } from "./AmountProp";
import { UserMassPreference } from "@prisma/client";

const meta: Meta<typeof AmountProp> = {
  component: AmountProp,
};
export default meta;

type Story = StoryObj<typeof AmountProp>;

export const Basic: Story = {
  args: {
    label: "Vol.",
    value: 10,
    unit: "gal",
    unitType: "volume",
  },
};
