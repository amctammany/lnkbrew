"use client";
import { Form, Submit, TextArea, TextField } from "@/components/Form";
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
import { AmountField1 as AmountField } from "@/components/Form/AmountField1";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { Section } from "@/components/Section";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { WaterProfile } from "@prisma/client";
import { ExtendedWaterProfile, WaterProfileInput } from "@/types/Profile";
//type WaterProfileInput = any;

export type WaterProfileFormProps = {
  profile: WaterProfileInput | null;
};
export const WaterProfileForm = ({ profile }: WaterProfileFormProps) => {
  const { control, register, trigger } = useForm<WaterProfileInput>({
    defaultValues: profile!,
  });
  const action = profile?.id ? updateWaterProfile : createWaterProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Form action={onSubmit}>
      <Section
        icon="WaterProfileIcon"
        header={profile?.name ?? "New Water Profile"}
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
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
            <Controller
              name="calcium"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<Ca2 />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="magnesium"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<MgSo4 />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="sodium"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<Na />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="chloride"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<Cl />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="sulfate"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<SO4 />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
            />
            <Controller
              name="bicarbonate"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <AmountField
                  className="flex-grow"
                  {...field}
                  value={field.value ?? 0}
                  label={<HCO3 />}
                  amountType="concentration"
                  step={0.01}
                />
              )}
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
