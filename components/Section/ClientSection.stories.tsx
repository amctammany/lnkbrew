import type { Meta, StoryObj } from "@storybook/react";

import { ClientSection } from "./ClientSection";
//import { Toolbar } from "../Toolbar/Toolbar";
import Button from "../Button/Button";
import { Toolbar } from "../Toolbar";

const meta: Meta<typeof ClientSection> = {
  title: "Section/ClientSection",
  component: ClientSection,
};
export default meta;

type Story = StoryObj<typeof ClientSection>;
const clientSectionBody = (
  <div>
    <h4>ClientSection Body</h4>
    <p>Stuff</p>
    <ul>
      <li>1st</li>
      <li>2nd</li>
      <li>3rd</li>
    </ul>
  </div>
);

export const Basic: Story = {
  args: {
    header: "Basic",
    //className: "",
    children: clientSectionBody,
  },
};
export const Footer: Story = {
  args: {
    header: "Footer",
    variant: "warning",
    children: clientSectionBody,
    footer: (
      <Toolbar variant="default">
        <Button size="toolbar" variant="toolbar">
          X
        </Button>
      </Toolbar>
    ),
  },
};

export const Warning: Story = {
  args: {
    header: "Warning",
    variant: "warning",
    children: clientSectionBody,
  },
};
