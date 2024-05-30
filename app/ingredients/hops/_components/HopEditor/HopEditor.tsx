"use client";
import { IconButton } from "@/components/Button/IconButton";
import { AmountField, Form, TextArea, TextField } from "@/components/Form";
import { Toolbar } from "@/components/Toolbar";
import { Hop } from "@prisma/client";
import { useForm } from "react-hook-form";

export type HopEditorProps = {
  hop: Hop | null;
  action?: (formData: FormData) => void;
};
export function HopEditor({ hop, action }: HopEditorProps) {
  const { register } = useForm<Hop>({
    defaultValues: hop || {},
  });

  return (
    <Form action={action}>
      <Toolbar variant="topbar" title={"Editing: " + hop?.name}>
        <IconButton iconType="SaveIcon">Save</IconButton>
      </Toolbar>
      <div className="p-4">
        <input type="hidden" {...register("id")} />
        <TextField label="Name" {...register("name")} />
        <TextArea
          rows={3}
          label="Characteristics"
          {...register("characteristics")}
        />
        <TextArea rows={3} label="Notes" {...register("notes")} />

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <AmountField
            step={0.01}
            amountType="%"
            label="Alpha Acids"
            {...register("alpha")}
          />
          <AmountField
            step={0.01}
            amountType="%"
            label="Beta Acids"
            {...register("beta")}
          />
        </div>
      </div>
    </Form>
  );
}

export default HopEditor;
