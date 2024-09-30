"use client";
import {
  Form,
  NumberField,
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
  createEquipmentProfile,
  updateEquipmentProfile,
} from "@/app/profiles/equipment/actions";
import { Prisma, TimeUnit, UnitPreferences } from "@prisma/client";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { AmountField } from "@/components/Form/AmountField";
import { Ca2, Cl, HCO3, MgSo4, Na, SO4 } from "@/components/Elements";
import { IconButton } from "@/components/Button/IconButton";
import { EquipmentProfile, UserVolumePreference } from "@prisma/client";
import { Section } from "@/components/Section";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import {
  EquipmentProfileInput,
  ExtendedEquipmentProfile,
} from "@/types/Profile";
import { useActionState, useEffect } from "react";
import { PrefAmountField } from "@/components/Form/PrefAmountField";
import { State } from "@/lib/validateSchema";

export type EquipmentProfileFormProps = {
  profile: EquipmentProfileInput | null;
  action: any; //(prefs: UnitPreferences, formData: FormData) => void;
  prefs?: Omit<UnitPreferences, "id">;
};
export const EquipmentProfileForm = ({
  profile,
  action,
  prefs,
}: EquipmentProfileFormProps) => {
  const [state, formAction] = useActionState<State<EquipmentProfileInput, any>>(
    action,
    {
      success: true,
      errors: undefined,
      data: profile!,
    }
  );

  const { control, reset, setError, register, trigger } =
    useForm<EquipmentProfileInput>({
      defaultValues: profile!,
    });
  //const action = profile?.id ? updateEquipmentProfile : createEquipmentProfile;

  useEffect(() => {
    //reset(state.data);
    if (!state.success) {
      Object.entries(state?.errors ?? []).map(([n, err]) => {
        setError(err.path as any, err);
      });
    }
  }, [state, setError, reset]);

  //const onSubmit = async (data: FormData) => {
  //const valid = await trigger();
  //if (!valid) return;
  //return action(data);
  //};
  /**
   <Toolbar variant="topbar" title={profile?.name ?? "New EquipmentProfile"}>
        <IconButton type="submit" iconType="EditIcon">
          Save
        </IconButton>
      </Toolbar>10
*
   */
  return (
    <Form action={formAction}>
      <Section
        Icon={EquipmentProfileIcon}
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
          <div className="col-span-3 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <PrefAmountField
              preferences={prefs}
              type="volume"
              {...register("batchVolume")}
              label="Batch Volume"
              step={0.01}
              error={state.errors?.batchVolume}
            />
            <PrefAmountField
              preferences={prefs}
              type="time"
              {...register("boilTime")}
              label="Boil Time"
              step={0.01}
              error={state.errors?.boilTime}
            />
            <PrefAmountField
              preferences={prefs}
              type="time"
              {...register("boilOffRate")}
              label="Boil Off Rate"
              step={0.01}
              error={state?.errors?.boilOffRate}
            />
            <PrefAmountField
              preferences={prefs}
              type="volume"
              {...register("trubLoss")}
              label="Trub Loss"
              step={0.01}
              error={state.errors?.trubLoss}
            />

            <PrefAmountField
              preferences={prefs}
              type="volume"
              {...register("fermenterLoss")}
              label="Fermenter Loss"
              step={0.01}
              error={state.errors?.fermenterLoss}
            />
            <PrefAmountField
              preferences={prefs}
              type="volume"
              {...register("mashLoss")}
              label="Mash Loss"
              step={0.01}
              error={state.errors?.mashLoss}
            />

            <PrefAmountField
              type="percent"
              {...register("brewEfficiency")}
              suffix="%"
              step={0.01}
              label="Brew Efficiency"
            />
            <PrefAmountField
              type="percent"
              {...register("mashEfficiency")}
              suffix="%"
              step={0.01}
              label="Mash Efficiency"
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
