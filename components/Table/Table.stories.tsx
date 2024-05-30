import type { Meta, StoryObj } from "@storybook/react";

import { Table } from "./Table";
import { DataColumnProps } from "./types";

const meta: Meta<typeof Table<D>> = {
  component: Table,
};
export default meta;
type D = { name: string; description: string };

const data: D[] = [
  { name: "first", description: "foobar" },
  { name: "second", description: "why" },
  { name: "third", description: "bar" },
];
const columns: DataColumnProps<D>[] = [
  { name: "name", href: (src: D) => `/sub/${src.name}` },
  { name: "description" },
];

type Story = StoryObj<typeof Table<D>>;

export const Basic: Story = {
  args: {
    columns,
    src: data,
    //children: "Basic",
  },
};
