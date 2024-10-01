import type { Meta, StoryObj } from "@storybook/react";

import { Section } from "./Section";
//import { Toolbar } from "../Toolbar/Toolbar";
import Button from "../Button/Button";
import { Toolbar } from "../Toolbar";

const meta: Meta<typeof Section> = {
  title: "Section/Section",
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
    children: sectionBody,
    actions: (
      <>
        <Button>X</Button>
        <Button>Y</Button>
        <Button>Z</Button>
      </>
    ),
  },
};
