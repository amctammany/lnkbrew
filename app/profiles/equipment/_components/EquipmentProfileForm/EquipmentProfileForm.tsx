"use client";
import { Form, Submit, TextArea, TextField } from "@/components/Form";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/profiles/equipment/actions";
import { Prisma, TimeUnit } from "@prisma/client";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { EquipmentProfile, UserVolumePreference } from "@prisma/client";
import { Section } from "@/components/Section";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
type EquipmentProfileInput = any;

export type EquipmentProfileFormProps = {
  profile: EquipmentProfileInput | null;
};
export const EquipmentProfileForm = ({
  profile,
}: EquipmentProfileFormProps) => {
  const { control, register, trigger } = useForm<EquipmentProfile>({
    defaultValues: profile,
  });
  const action = profile?.id ? updateEquipmentProfile : createEquipmentProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  /**
   <Toolbar variant="topbar" title={profile?.name ?? "New EquipmentProfile"}>
        <IconButton type="submit" iconType="EditIcon">
          Save
        </IconButton>
      </Toolbar>
*
   */
  return (
    <Form action={onSubmit}>
      <Section
        icon="EquipmentProfileIcon"
        header={profile?.name ?? "New EquipmentProfile"}
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
            <TextField {...register("name")} label="Name" />
          </div>
          <div className="col-span-3 md:col-span-6">
            <TextField {...register("description")} label="Description" />
          </div>
          <div className="col-span-2 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <AmountField
              {...register("batchVolume")}
              label="Batch Volume"
              amountType="volume"
              //amount
              //amountTypes={UserVolumePreference}
              step={0.01}
            />
            <AmountField
              {...register("boilTime")}
              label="Boil Time"
              amountType={TimeUnit.min}
              step={1}
            />
            <AmountField
              {...register("boilOffRate")}
              label="Boil Off Rate"
              amountType="gal/hr"
              step={0.01}
            />

            <AmountField
              {...register("brewEfficiency")}
              label="Brew Efficiency"
              amountType="%"
              step={0.01}
            />
            <AmountField
              {...register("mashEfficiency")}
              label="Mash Efficiency"
              amountType="%"
              step={0.01}
            />
            <AmountField
              {...register("trubLoss")}
              label="Trub Loss"
              amountType="gal"
              step={0.01}
            />
            <AmountField
              {...register("fermenterLoss")}
              label="Fermenter Loss"
              amountType="gal"
              step={0.01}
            />
            <AmountField
              {...register("mashLoss")}
              label="Mash Loss"
              amountType="gal"
              step={0.01}
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
