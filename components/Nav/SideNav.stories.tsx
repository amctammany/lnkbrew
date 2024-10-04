import type { Meta, StoryObj } from "@storybook/react";

import { Nav } from "./Nav";
import { SideNavLink } from "./SideNavLink";
import { SideNav } from "./SideNav";
import { AddIcon } from "../Icon/AddIcon";
import SideNavDropdown from "./SideNavDropdown";
import { ProfileIcon } from "../Icon/ProfileIcon";

const meta: Meta<typeof SideNav> = {
  component: SideNav,
};
export default meta;

type Story = StoryObj<typeof SideNav>;

const body = <div>Body</div>;
export const Basic: Story = {
  parameters: {
    nextjs: {
      visualViewport: {},
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
    title: "Title",
    body,
    children: (
      <>
        <SideNavLink label="Link 1" href="/">
          <AddIcon />
        </SideNavLink>
        <SideNavLink label="Link 2" href="/">
          <AddIcon />
        </SideNavLink>
        <SideNavLink label="Link 3" href="/">
          <AddIcon />
        </SideNavLink>
        <SideNavLink label="Link 4" href="/">
          <AddIcon />
        </SideNavLink>
      </>
    ),
  },
};

export const Warning: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile/foo",
        query: {
          user: "santa",
        },
      },
    },
  },

  args: {
    variant: "warning",
    title: "Title",
    body,
    children: (
      <>
        <SideNavLink label="Link 1" href="/">
          <AddIcon />
        </SideNavLink>
        <SideNavDropdown label="Link 2" href="/profile" Icon={<ProfileIcon />}>
          <SideNavLink label="Link 2a" href="/profile/foo">
            <AddIcon />
          </SideNavLink>
          <SideNavLink label="Link 2b" href="/profile/bar">
            <AddIcon />
          </SideNavLink>
        </SideNavDropdown>
        <SideNavLink label="Link 4" href="/">
          <AddIcon />
        </SideNavLink>
      </>
    ),
    //variant: "warning",
  },
};
