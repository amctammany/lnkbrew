import type { Meta, StoryObj } from "@storybook/react";

import { ClientTable } from "./ClientTable";
import { DataColumnProps } from "../Table/DataColumn";

const meta: Meta<typeof ClientTable<D>> = {
  component: ClientTable,
};
export default meta;
type D = { id: number; name: string; description: string };

const data: D[] = [
  { id: 0, name: "first", description: "foobar" },
  { id: 1, name: "second", description: "why" },
  { id: 2, name: "third", description: "bar" },
];
const columns: DataColumnProps<D>[] = [
  { name: "name", href: (src: D) => `/sub/${src.name}` },
  { name: "description" },
];

type Story = StoryObj<typeof ClientTable<D>>;

export const Basic: Story = {
  args: {
    columns,
    src: data,
    //children: "Basic",
  },
};
