import type { Meta, StoryObj } from "@storybook/react";

import { Toolbar } from "./Toolbar";
import { Button } from "../Button/Button";
import { LinkIcon, CircleStackIcon } from "@heroicons/react/20/solid";

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
};
export default meta;

type Story = StoryObj<typeof Toolbar>;
const toolbarBody = [
  <Button key="X" variant="primary" size="toolbar">
    <CircleStackIcon className="w-5 h-5" />
  </Button>,
  <Button key="Y" variant="success" size="toolbar">
    <LinkIcon className="w-5 h-5" />
  </Button>,
];

export const Basic: Story = {
  args: {
    //className: "",
    children: toolbarBody,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: toolbarBody,
  },
};
