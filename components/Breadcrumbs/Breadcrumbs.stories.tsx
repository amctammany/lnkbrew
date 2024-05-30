import type { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;
export const Basic: Story = {
  args: {
    //className: "",
    link: "/",
  },
};

export const Deep: Story = {
  args: {
    link: "/ingredients/hops/agnus",
    //variant: "warning",
  },
};
