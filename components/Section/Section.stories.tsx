import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "./Section";
//import { Toolbar } from "../Toolbar/Toolbar";
import Button from "../Button/Button";

const meta: Meta<typeof Section> = {
  component: Section,
};
export default meta;

type Story = StoryObj<typeof Section>;
const sectionBody = (
  <div>
    <h4>Section Body</h4>
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
    children: sectionBody,
  },
};
export const Footer: Story = {
  args: {
    header: "Footer",
    variant: "warning",
    children: sectionBody,
    footer: (
      <div>
        <Button>X</Button>
      </div>
    ),
  },
};

export const Warning: Story = {
  args: {
    header: "Warning",
    variant: "warning",
    children: sectionBody,
  },
};
