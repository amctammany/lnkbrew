"use client";
import { Form, Submit, TextArea, TextField } from "@/components/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  createWaterProfile,
  updateWaterProfile,
} from "@/app/profiles/water/actions";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
type WaterProfileInput = any;

export type WaterProfileFormProps = {
  profile: WaterProfileInput | null;
};
export const WaterProfileForm = ({ profile }: WaterProfileFormProps) => {
  const { control, register, trigger } = useForm<WaterProfileInput>({
    defaultValues: profile,
  });
  const action = profile?.id ? updateWaterProfile : createWaterProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };

  return (
    <Form action={onSubmit}>
      <Toolbar variant="topbar" title={profile?.name}>
        <IconButton type="submit" iconType="EditIcon">
          Save
        </IconButton>
      </Toolbar>

      <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
        <input type="hidden" {...register("id")} />
        <div className="col-span-3 md:col-span-6">
          <TextField {...register("name")} label="Name" />
        </div>
        <div className="col-span-3 md:col-span-6">
          <TextField {...register("description")} label="Description" />
        </div>
        <div className="col-span-3 md:col-span-6 grid grid-cols-3 lg:grid-cols-6">
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
        </div>
      </div>
      <Toolbar>
        <IconButton iconType="SaveIcon" type="submit">
          Save
        </IconButton>
      </Toolbar>
    </Form>
  );
};
