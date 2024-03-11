import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";
import { ListItem } from "./ListItem";
import { ListItemText } from "./ListItemText";
import { ListItemIcon } from "./ListItemIcon";
import { TrashIcon } from "@heroicons/react/20/solid";
import { ListItemButton } from "./ListItemButton";
import { IconButton } from "../Button/IconButton";
import { AddIcon } from "../Icon/AddIcon";

const meta: Meta<typeof List> = {
  component: List,
};
export default meta;
const TestListItem = ({ children }: any) => {
  return (
    <ListItem actions={<IconButton iconType="AddIcon" />}>
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

export const Actions: Story = {
  args: {
    children: (
      <>
        <ListItem
          actions={[
            <IconButton key="tt" iconType="DeleteIcon" />,
            <IconButton key="t1" iconType="StarIcon" />,
            <IconButton key="t2" iconType="SaveIcon" />,
          ]}
        >
          <ListItemIcon className="w-14">
            <AddIcon size="large" />
          </ListItemIcon>
          <ListItemText
            variant="warning"
            primary="primary"
            secondary="second"
          />
        </ListItem>
      </>
    ),
  },
};
