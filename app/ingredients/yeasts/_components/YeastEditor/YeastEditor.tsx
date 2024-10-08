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
import { RangeField } from "@/components/Form/RangeField";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { YeastIcon } from "@/components/Icon/YeastIcon";
import { RangeValue } from "@/components/Range/RangeSlider";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { State } from "@/lib/validateSchema";
import { YeastInput } from "@/types/Ingredient";
import {
  Yeast,
  YeastForm as YeastFormEnum,
  YeastFlocculation,
  YeastType,
} from "@prisma/client";
import { useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export type YeastEditorProps = {
  yeast: Yeast | null;
  action?: any; // (formData: FormData) => void;
};
export function YeastEditor({ action, yeast }: YeastEditorProps) {
  const [state, formAction] = useActionState<State<YeastInput>>(action, {
    success: true,
    data: yeast!,
    errors: undefined,
  });
  const { register, control, setError, reset, getValues } = useForm<YeastInput>(
    {
      defaultValues: yeast || {},
    }
  );

  useEffect(() => {
    //reset(state.data);
    if (!state.success) {
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path as any, err);
      });
    }
  }, [state, setError, reset]);

  return (
    <Form action={formAction}>
      <Section
        title={yeast?.name ?? "New Yeast"}
        Icon={YeastIcon}
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
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="tempRange"
                control={control}
                defaultValue={getValues(["tempLow", "tempHigh"]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Temperature Range"
                    min={32}
                    max={180}
                    step={0.1}
                  />
                )}
              />
            </div>
            <div className="col-span-2 md:col-span-4">
              <Controller
                name="attenuationRange"
                control={control}
                defaultValue={getValues([
                  "attenuationLow",
                  "attenuationHigh",
                ]).reduce(
                  (acc, v, i) => ({ ...acc, [i === 0 ? "min" : "max"]: v! }),
                  {} as RangeValue
                )}
                render={({ field }) => (
                  <RangeField
                    {...field}
                    label="Attenuation Range"
                    min={0}
                    max={1}
                    step={0.001}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Section>
    </Form>
  );
}

export default YeastEditor;
