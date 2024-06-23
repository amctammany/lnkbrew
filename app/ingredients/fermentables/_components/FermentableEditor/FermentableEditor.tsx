"use client";
import { IconButton } from "@/components/Button/IconButton";
import { AmountField, Form, TextArea, TextField } from "@/components/Form";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { Fermentable } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

export type FermentableEditorProps = {
  fermentable: Fermentable | null;
  action?: (formData: FormData) => void;
};
export function FermentableEditor({
  action,
  fermentable,
}: FermentableEditorProps) {
  const {
    register,
    control,
    control,
    control,
    control,
    control,
    control,
    control,
    control,
    control,
  } = useForm<Fermentable>({
    defaultValues: fermentable || {},
  });

  return (
    <Form action={action}>
      <Section
        title={fermentable?.name ?? "New Fermentable"}
        actions={
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        }
      >
        <div className="p-4">
          <input type="hidden" {...register("id")} />
          <TextField label="Name" {...register("name")} />
          <TextArea rows={3} label="Description" {...register("description")} />
          <TextArea rows={3} label="Notes" {...register("notes")} />

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Controller
              name="color"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Color"
                  amountType="color"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
            <Controller
              name="power"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Power"
                  amountType="color"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
            <AmountField
              step={1}
              amountType="°Lintner"
              label="Power"
              {...register("power")}
            />

            <Controller
              name="color"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  //{...register("batchVolume")}
                  {...field}
                  value={field.value ?? 0}
                  label="Color"
                  amountType="color"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />
          </div>
        </div>
      </Section>
    </Form>
  );
}

export default FermentableEditor;
/**
    <AmountField
              step={0.001}
              label="Potential"
              amountType="PPG"
              {...register("potential")}
            />
            <AmountField
              amountType="%"
              step={1}
              label="Max Usage"
              {...register("maxUsage")}
            />

*/
