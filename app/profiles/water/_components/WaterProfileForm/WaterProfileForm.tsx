"use client";
import {
  AmountField,
  Form,
  Submit,
  TextArea,
  TextField,
} from "@/components/Form";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  createWaterProfile,
  updateWaterProfile,
} from "@/app/profiles/water/actions";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { Section } from "@/components/Section";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { WaterProfile } from "@prisma/client";
import { ExtendedWaterProfile, WaterProfileInput } from "@/types/Profile";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { useActionState, useEffect } from "react";
import { ZodIssue } from "zod";
import { PrefAmountField } from "@/components/Form/PrefAmountField";
//type WaterProfileInput = any;
type State =
  | {
      success: false;
      errors?: Record<keyof Omit<WaterProfileInput, "type">, ZodIssue>;
      data?: any;
    }
  | { success: true; data: any; errors: undefined };

export type WaterProfileFormProps = {
  profile: WaterProfileInput | null;
  action: any;
};
export const WaterProfileForm = ({
  action,
  profile,
}: WaterProfileFormProps) => {
  const [state, formAction] = useActionState<State>(action, {
    success: true,
    errors: undefined,
    data: profile!,
  });
  const { control, register, setError, handleSubmit, reset, trigger } =
    useForm<WaterProfileInput>({
      defaultValues: profile!,
      values: state?.data,
    });
  //const action = profile?.id ? updateWaterProfile : createWaterProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(state, data);
  };
  useEffect(() => {
    reset(state.data);
    if (!state.success) {
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path.join(".") as any, err);
      });
    }
  }, [state, setError, reset]);

  return (
    <Form action={formAction}>
      <Section
        Icon={WaterProfileIcon}
        header={profile?.name ?? "New Water Profile"}
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
          {JSON.stringify(state)}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("userId")} />
          <input type="hidden" {...register("forkedFrom")} />
          <div className="col-span-3 md:col-span-6">
            <TextField
              {...register("name")}
              label="Name"
              placeholder="New Water Profile"
            />
          </div>
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-3 md:col-span-6 grid grid-cols-3 lg:grid-cols-6">
            <PrefAmountField
              {...register("calcium", { valueAsNumber: true })}
              error={state.errors?.calcium as any}
              label={<Ca2 />}
              step={0.01}
              type="concentration"
            />
            <PrefAmountField
              {...register("magnesium", { valueAsNumber: true })}
              error={state.errors?.magnesium as any}
              label={<MgSo4 />}
              step={0.01}
              type="concentration"
            />
            <PrefAmountField
              {...register("sodium", { valueAsNumber: true })}
              error={state.errors?.sodium as any}
              label={<Na />}
              step={0.01}
              type="concentration"
            />
            <PrefAmountField
              {...register("chloride", { valueAsNumber: true })}
              error={state.errors?.chloride as any}
              label={<Cl />}
              step={0.01}
              type="concentration"
            />
            <PrefAmountField
              {...register("sulfate", { valueAsNumber: true })}
              error={state.errors?.sulfate as any}
              label={<SO4 />}
              step={0.01}
              type="concentration"
            />
            <PrefAmountField
              {...register("bicarbonate", { valueAsNumber: true })}
              error={state.errors?.bicarbonate as any}
              label={<HCO3 />}
              step={0.01}
              type="concentration"
            />
          </div>
        </div>
        <Toolbar>
          <IconButton Icon={SaveIcon} type="submit">
            Save
          </IconButton>
        </Toolbar>
      </Section>
    </Form>
  );
};
/**
            <AmountField
              {...register("calcium")}
              label={<Ca2 />}
              amountType="ppm"
            />

            <AmountField
              {...register("magnesium")}
              label={<MgSo4 />}
              amountType="ppm"
            />
            <AmountField
              {...register("sodium")}
              label={<Na />}
              amountType="ppm"
            />
            <AmountField
              {...register("chloride")}
              label={<Cl />}
              amountType="ppm"
            />
            <AmountField
              {...register("sulfate")}
              label={<SO4 />}
              amountType="ppm"
            />
            <AmountField
              {...register("bicarbonate")}
              label={<HCO3 />}
              amountType="ppm"
            />
*/
