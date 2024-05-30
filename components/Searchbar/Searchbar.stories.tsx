import type { Meta, StoryObj } from "@storybook/react";

import { Searchbar } from "./Searchbar";
import { Button } from "../Button";
import { LinkIcon, CircleStackIcon } from "@heroicons/react/20/solid";

const meta: Meta<typeof Searchbar> = {
  component: Searchbar,
};
export default meta;

type Story = StoryObj<typeof Searchbar>;

export const Basic: Story = {
  args: {
    //className: "",
    //children: searchbarBody,
  },
};

export const SearchButton: Story = {
  args: {
    variant: "warning",
    children: (
      <Button size="toolbar" className="mx-0">
        Search
      </Button>
    ),
  },
};
export const Warning: Story = {
  args: {
    variant: "warning",
    //children: searchbarBody,
  },
};
