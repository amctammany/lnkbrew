"use client";
import { IconButton } from "@/components/Button/IconButton";
import { AmountField, Form, TextArea, TextField } from "@/components/Form";
import { GrainIcon } from "@/components/Icon/GrainIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { State } from "@/lib/validateSchema";
import { Fermentable } from "@prisma/client";
import { useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export type FermentableEditorProps = {
  fermentable: Fermentable | null;
  action: any; // (prev: any, formData: FormData) => void;
};
export function FermentableEditor({
  action,
  fermentable,
}: FermentableEditorProps) {
  const [state, formAction] = useActionState<State<Fermentable>>(action, {
    success: true,
    data: fermentable!,
    errors: undefined,
  });

  const { register, control, setError } = useForm<Fermentable>({
    defaultValues: fermentable || {},
  });
  useEffect(() => {
    //reset(state.data);
    if (!state.success) {
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path as any, err);
      });
    }
  }, [state, setError]);

  return (
    <Form action={formAction}>
      <Section
        title={fermentable?.name ?? "New Fermentable"}
        Icon={GrainIcon}
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
                  amountType="unit"
                  amountUnit="°Lintner"
                  //amount
                  //amountTypes={UserVolumePreference}
                  step={0.01}
                />
              )}
            />

            <Controller
              name="potential"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Potential"
                  amountType="unit"
                  amountUnit="PPG"
                  step={0.01}
                />
              )}
            />

            <Controller
              name="maxUsage"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  {...field}
                  value={field.value ?? 0}
                  label="Max Usage"
                  amountType="percentage"
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
