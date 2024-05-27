import type { Meta, StoryObj } from "@storybook/react";

import { AmountField } from "./AmountField";
import { UserMassPreference } from "@prisma/client";
const meta: Meta<typeof AmountField> = {
  component: AmountField,
  decorators: [
    (Story) => (
      <div className="flex justify-center h-screen">
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof AmountField>;

export const Basic: Story = {
  args: { name: "name", defaultValue: 2, amountType: UserMassPreference.g },
};
export const LbOz: Story = {
  args: { name: "name", defaultValue: 12, amountType: UserMassPreference.LbOz },
};
