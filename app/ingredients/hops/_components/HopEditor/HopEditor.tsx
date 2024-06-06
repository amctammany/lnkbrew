"use client";
import { IconButton } from "@/components/Button/IconButton";
import {
  AmountField,
  Form,
  Select,
  TextArea,
  TextField,
} from "@/components/Form";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { Hop, HopUsage } from "@prisma/client";
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
      <Section
        title={hop?.name ?? "New Hop"}
        actions={<IconButton Icon={SaveIcon}>Save</IconButton>}
      >
        <div className="p-4">
          <input type="hidden" {...register("id")} />
          <TextField label="Name" {...register("name")} />
          <TextField label="Country" {...register("country")} />
          <Select {...register("usage")} options={HopUsage} />
          <TextArea label="flavor" {...register("flavor")} />

          <TextArea
            rows={3}
            label="Characteristics"
            {...register("characteristics")}
          />
          <TextArea rows={3} label="Notes" {...register("notes")} />

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Alpha Acids"
              {...register("alpha", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Beta Acids"
              {...register("beta", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={25}
              amountType="%"
              label="Cohumulone"
              {...register("cohumulone", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={75}
              amountType="%"
              label="Caryophyllene"
              {...register("caryophyllene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Farnesene"
              {...register("farnesene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={35}
              amountType="%"
              label="Humulene"
              {...register("humulene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={85}
              amountType="%"
              label="Myrcene"
              {...register("myrcene", { valueAsNumber: true })}
            />
            <AmountField
              step={0.01}
              min={0}
              max={15}
              amountType="%"
              label="Total Oils"
              {...register("totalOil", { valueAsNumber: true })}
            />
          </div>
        </div>
      </Section>
    </Form>
  );
}

export default HopEditor;
