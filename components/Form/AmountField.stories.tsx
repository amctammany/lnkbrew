import type { Meta, StoryObj } from "@storybook/react";

import { AmountField } from "./AmountField";
//import { UserMassPreference } from "@prisma/client";
const meta: Meta<typeof AmountField> = {
  title: "Form/AmountField",
  component: AmountField,
};
export default meta;

type Story = StoryObj<typeof AmountField>;

export const Basic: Story = {
  args: { name: "name", value: 2, amountType: "volume", amountUnit: "L" },
};
export const Temperature: Story = {
  args: {
    name: "temperature",
    value: 2,
    amountType: "temperature",
    amountUnit: "F",
    onChange: (v) => console.log(v),
  },
};

export const LbOz: Story = {
  args: {
    name: "name",
    defaultValue: 12,
    amountType: "fermentableMass",
    amountUnit: "LbOz",
  },
};
