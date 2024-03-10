import type { Meta, StoryObj } from "@storybook/react";

import { Nav } from "./Nav";
import { NavLink } from "./NavLink";
import { SubNav } from "./SubNav";

const meta: Meta<typeof Nav> = {
  component: Nav,
};
export default meta;

type Story = StoryObj<typeof Nav>;

const body = <div>Body</div>;
export const Basic: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile",
        query: {
          user: "santa",
        },
      },
    },
  },
  args: {
    children: (
      <SubNav body={body}>
        <NavLink href="/">Link</NavLink>
      </SubNav>
    ),
  },
};

export const Warning: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile",
        query: {
          user: "santa",
        },
      },
    },
  },

  args: {
    children: (
      <SubNav body={body}>
        <NavLink href="#">Link</NavLink>
      </SubNav>
    ),
    //variant: "warning",
  },
};
