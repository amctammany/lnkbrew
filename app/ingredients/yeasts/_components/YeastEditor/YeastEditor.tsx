"use client";
import { IconButton } from "@/components/Button/IconButton";
import {
  AmountField,
  Form,
  NumberField,
  Select,
  TextArea,
  TextField,
} from "@/components/Form";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import {
  Yeast,
  YeastForm as YeastFormEnum,
  YeastFlocculation,
  YeastType,
} from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

export type YeastEditorProps = {
  yeast: Yeast | null;
  action?: (formData: FormData) => void;
};
export function YeastEditor({ action, yeast }: YeastEditorProps) {
  const { register, control } = useForm<Yeast>({
    defaultValues: yeast || {},
  });

  return (
    <Form action={action}>
      <Section
        title={yeast?.name ?? "New Yeast"}
        actions={
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        }
      >
        <div className="p-4">
          <input type="hidden" {...register("id")} />
          <TextField label="Name" {...register("name")} />
          <TextField label="Manufacturer" {...register("manufacturer")} />
          <TextArea label="notes" {...register("notes")} />
          <TextArea label="Usage" {...register("usage")} />
          <div className="grid grid-cols-3 gap-4">
            <Select {...register("type")} options={YeastType} />
            <Select {...register("form")} options={YeastFormEnum} />
            <Select {...register("flocculation")} options={YeastFlocculation} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="attenuation"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Attenuation"
                  amountType="percent"
                  step={0.001}
                />
              )}
            />
            <Controller
              name="tempLow"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Temp Low"
                  amountType="temperature"
                  step={0.1}
                />
              )}
            />
            <Controller
              name="tempHigh"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Temp High"
                  amountType="temperature"
                  step={0.1}
                />
              )}
            />
          </div>
        </div>
      </Section>
    </Form>
  );
}

export default YeastEditor;
