"use client";
//import { User } from "@prisma/client";
import {
  TimeUnit,
  UserColorPreference,
  UserGravityPreference,
  UserMassPreference,
  UserPreferences,
  UserTemperaturePreference,
  UserVolumePreference,
} from "@prisma/client";
import { Autocomplete } from "@/components/Form/Autocomplete";
import { Form } from "@/components/Form/Form";
import { Select } from "@/components/Form/Select";
import { Submit } from "@/components/Form/Submit";

import React, { FC, useMemo } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { RangeField } from "@/components/Form/RangeField";

type AdminSettingsProps = { src?: UserPreferences | null; action: any };
const equipmentProfiles = ["equ1", "eq2"];
export function AdminSettings({ src, action }: AdminSettingsProps) {
  const {
    register,
    control,
    formState: { errors },
    setError,
  } = useForm<
    UserPreferences & {
      range: { min: number; max: number }; //[number, number];
      rangeLow?: number;
      rangeHigh?: number;
    }
  >({
    defaultValues: src || {},
  });
  const onSubmit = async (data: FormData) => {
    const res = await action(data);
    if (res?.errors?.length) {
      res.errors.forEach((err: any) =>
        setError(err.path, { type: err.code, message: err.message })
      );
    }
    //if (res?.redirect) redirect(res.redirect);
    //await trigger();
  };

  return (
    <div className="m-auto w-full">
      <h4>Admin Settings</h4>
      <Form action={onSubmit}>
        <input type="hidden" {...register("userId")} />
        <Controller
          name="range"
          control={control}
          render={({ field }) => <RangeField {...field} min={0} max={100} />}
        />
        <Select
          {...register("volumeUnit")}
          error={errors.volumeUnit}
          options={UserVolumePreference}
        />
        <Select
          {...register("colorUnit")}
          error={errors.colorUnit}
          options={UserColorPreference}
        />
        <Select
          {...register("timeUnit")}
          error={errors.timeUnit}
          options={TimeUnit}
        />

        <Select {...register("hopMassUnit")} options={UserMassPreference} />
        <Select
          {...register("fermentableMassUnit")}
          error={errors?.fermentableMassUnit}
          options={UserMassPreference}
        />
        <Select
          {...register("temperatureUnit")}
          error={errors?.temperatureUnit}
          options={UserTemperaturePreference}
        />
        <Autocomplete
          //required
          error={errors?.equipmentProfileId}
          {...register("equipmentProfileId")}
          value={src?.equipmentProfileId ?? undefined}
          options={equipmentProfiles}
        />
        <Select
          {...register("gravityUnit")}
          error={errors?.gravityUnit}
          options={UserGravityPreference}
        />
        <Submit>Save</Submit>
      </Form>
    </div>
  );
}

export default AdminSettings;
/**
        <Select {...register("mashProfileId")} options={mashProfiles} />
        <Select {...register("sourceWaterProfileId")} options={waterProfiles} />
        <Select {...register("targetWaterProfileId")} options={waterProfiles} />
        */
