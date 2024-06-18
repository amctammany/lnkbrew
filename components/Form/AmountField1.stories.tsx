import type { Meta, StoryObj } from "@storybook/react";

import { AmountField1 } from "./AmountField1";
//import { UserMassPreference } from "@prisma/client";
const meta: Meta<typeof AmountField1> = {
  title: "Form/AmountField1",
  component: AmountField1,
};
export default meta;

type Story = StoryObj<typeof AmountField1>;

export const Basic: Story = {
  args: { name: "name", value: 2, amountType: "volume", amountUnit: "L" },
};
export const LbOz: Story = {
  args: { name: "name", defaultValue: 12, amountType: "hopMass" },
};
