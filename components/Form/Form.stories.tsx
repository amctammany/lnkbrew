import type { Meta, StoryObj } from "@storybook/react";

import {
  Form,
  TextArea,
  TextField,
  NumberField,
  AmountField,
  Autocomplete,
  Select,
  Submit,
} from "./index";
import { FormEventHandler } from "react";
import { zfd } from "zod-form-data";
import { z } from "zod";
const meta: Meta<typeof Form> = {
  component: Form,
  title: "Form/Form",
  subcomponents: {
    TextArea,
    TextField,
    AmountField,
    NumberField,
    Select,
    Submit,
    Autocomplete,
  } as any,
  decorators: [
    (Story) => (
      <div className="flex justify-center h-screen">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Form>;
const schema = zfd.formData({
  name: zfd.text(),
  age: zfd.numeric(z.number()),
});

const action = async (formData: FormData) => {
  const data = schema.parse(formData);

  const res = await Promise.resolve(data);
  return res;
};
const onSubmit: FormEventHandler<any> = (e) => {
  //const res = await Promise.resolve(data);
  e.preventDefault();
  return false;
};

export const Basic: Story = {
  args: {
    //name: "name",
    //action,
    onSubmit,
    children: (
      <>
        <TextField name="name" variant="error" value="name" />
        <NumberField name="age" min={0} max={100} step={1} value={12} />
        <Submit>Save</Submit>
      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    action,
    onSubmit,
    children: (
      <>
        <TextArea name="description" />
        <NumberField name="age" />
        <AmountField name="amt" amountType="volume" />
        <Submit />
      </>
    ),
  },
};
