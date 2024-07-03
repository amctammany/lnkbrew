import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  component: Radio,
};
export default meta;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: {
    name: "foo",
    onChange: (v) => v,
    value: "foo",
    options: { name: "foo", bar: "doo" },
  },
};
