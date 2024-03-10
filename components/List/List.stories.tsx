import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";
import { ListItem } from "./ListItem";
import { ListItemText } from "./ListItemText";
import { ListItemIcon } from "./ListItemIcon";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ListItemButton } from "./ListItemButton";

const meta: Meta<typeof List> = {
  component: List,
};
export default meta;
const TestListItem = ({ children }: any) => {
  return (
    <ListItem
      secondaryAction={
        <ListItemButton>
          <TrashIcon className="h-6 w-6 text-red-500 " />
        </ListItemButton>
      }
    >
      <ListItemIcon className="w-14">
        <span className="text-lg">X</span>
      </ListItemIcon>
      <ListItemText primary={children} secondary="second" />
    </ListItem>
  );
};
type Story = StoryObj<typeof List>;
const listBody = (
  <>
    <TestListItem>1st</TestListItem>
    <TestListItem>2st</TestListItem>
    <TestListItem>3st</TestListItem>
  </>
);

export const Basic: Story = {
  args: {
    //className: "",
    children: listBody,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: listBody,
  },
};
