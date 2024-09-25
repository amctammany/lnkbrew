import type { Meta, StoryObj } from "@storybook/react";

import { Nav } from "./Nav";
import { SideNavLink } from "./SideNavLink";
import { SideNav } from "./SideNav";

const meta: Meta<typeof SideNav> = {
  component: SideNav,
};
export default meta;

type Story = StoryObj<typeof SideNav>;

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
    body,
    children: (
      <>
        <SideNavLink href="/docs/nav-sidenav--docs">Link 1</SideNavLink>
        <SideNavLink href="/2">Link 2</SideNavLink>
        <SideNavLink href="/">Link 3</SideNavLink>
        <SideNavLink href="/profile">Link 4</SideNavLink>
      </>
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
    variant: "warning",
    body,
    children: (
      <>
        <SideNavLink href="/">Link 1</SideNavLink>
        <SideNavLink href="/">Link 2</SideNavLink>
        <SideNavLink href="/">Link 3</SideNavLink>
        <SideNavLink href="/">Link 4</SideNavLink>
      </>
    ),
    //variant: "warning",
  },
};
