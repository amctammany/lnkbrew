"use client";
import {
  AmountField,
  Form,
  NumberField,
  Select,
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
  createMashProfile,
  updateMashProfile,
} from "@/app/profiles/mash/actions";
//import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { IconButton } from "@/components/Button/IconButton";
import { Section } from "@/components/Section";
import { MashProfile, MashStepType, MashStep } from "@prisma/client";
import { Button } from "@/components/Button";
import { ExtendedMashProfile, MashProfileInput } from "@/types/Profile";
import { SaveIcon } from "@/components/Icon/SaveIcon";
import { AddIcon } from "@/components/Icon/AddIcon";
import { DeleteIcon } from "@/components/Icon/DeleteIcon";
//import { ExtendedMashProfile } from "@/types/Profile";

export type MashProfileFormProps = {
  profile: MashProfileInput | null;
};
export const MashProfileForm = ({ profile }: MashProfileFormProps) => {
  const { control, register, watch, trigger } = useForm<MashProfileInput>({
    defaultValues: profile ?? {},
  });
  const { fields, remove, append, swap } = useFieldArray({
    control,
    name: "steps",
  });
  const watchFieldArray = watch("steps");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const action = profile?.id ? updateMashProfile : createMashProfile;

  const onSubmit = async (data: FormData) => {
    const valid = await trigger();
    if (!valid) return;
    return action(data);
  };
  const addStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    append({
      name: "",
      type: MashStepType.temperature,
      temperature: 120,
      time: 0,
      rampTime: 0,
    });
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  const handleSwap = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.dataset.index!);
    const direction = parseInt(e.currentTarget.dataset.direction!);
    //move(0, 1);
    swap(index, index + direction);
    e.preventDefault();
    e.stopPropagation();
    return false;
  };
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = parseInt(e.currentTarget.dataset.index!);
    remove(index);
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <Form action={onSubmit}>
      <Section
        icon="MashProfileIcon"
        header={profile?.name ?? "New Mash Profile"}
        actions={
          <IconButton type="submit" Icon={SaveIcon}>
            Save
          </IconButton>
        }
      >
        <div>
          <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-6">
            <input type="hidden" {...register("id")} />
            <input type="hidden" {...register("userId")} />
            <input type="hidden" {...register("forkedFrom")} />
            <div className="col-span-3 md:col-span-6">
              <TextField
                {...register("name")}
                label="Name"
                placeholder="New Mash Profile"
              />
            </div>
            <div className="col-span-3 md:col-span-6">
              <TextField {...register("description")} label="Description" />
            </div>
          </div>
          <Section
            title="Steps"
            actions={<IconButton Icon={AddIcon} onClick={addStep} />}
          >
            {(controlledFields || []).map((field, index) => (
              <div
                key={field.id} // important to include key with field's id
                className="w-full flex flex-row "
              >
                <div className="m-auto grid  ">
                  <div className="border-2 border-black rounded-lg p-2">
                    {index}
                  </div>
                </div>
                <div className="flex-grow grid gap-x-2 grid-cols-5">
                  <div>
                    <TextField
                      {...register(`steps.${index}.name` as const, {
                        value: field.name,
                      })}
                      label="Name"
                    />
                  </div>
                  <div>
                    <Select
                      label="Type"
                      {...register(`steps.${index}.type` as const, {
                        value: field.type,
                      })}
                      options={MashStepType}
                    />
                  </div>
                  <Controller
                    name={`steps.${index}.temperature`}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <AmountField
                        {...field}
                        value={field.value ?? 0}
                        label="Temperature"
                        amountType="temperature"
                      />
                    )}
                  />
                  <Controller
                    name={`steps.${index}.time`}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <AmountField
                        {...field}
                        value={field.value ?? 0}
                        label="Time"
                        amountType="time"
                      />
                    )}
                  />
                  <Controller
                    name={`steps.${index}.rampTime`}
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <AmountField
                        {...field}
                        value={field.value ?? 0}
                        label="Ramp Time"
                        amountType="time"
                      />
                    )}
                  />
                </div>
                <div className="m-auto grid pt-3">
                  <Button
                    className={`${index > 0 ? "block" : "hidden"}`}
                    data-index={index}
                    data-direction={-1}
                    onClick={handleSwap}
                  >
                    Up
                  </Button>
                  <Button
                    className={`${
                      index < controlledFields.length - 0 ? "block" : "hidden"
                    }`}
                    data-index={index}
                    data-direction={1}
                    onClick={handleSwap}
                  >
                    down
                  </Button>
                  <IconButton
                    Icon={DeleteIcon}
                    data-index={index}
                    onClick={handleRemove}
                  />
                </div>
              </div>
            ))}
          </Section>
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
