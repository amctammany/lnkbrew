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
import { Toolbar } from "@/components/Toolbar";
import {
  Yeast,
  YeastForm as YeastFormEnum,
  YeastFlocculation,
  YeastType,
} from "@prisma/client";
import { useForm } from "react-hook-form";

export type YeastEditorProps = {
  yeast: Yeast | null;
  action?: (formData: FormData) => void;
};
export function YeastEditor({ action, yeast }: YeastEditorProps) {
  const { register } = useForm<Yeast>({
    defaultValues: yeast || {},
  });

  return (
    <Form action={action}>
      <Toolbar variant="topbar" title={yeast?.name ?? "New Yeast"}>
        <IconButton iconType="SaveIcon" type="submit">
          Save
        </IconButton>
      </Toolbar>
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
          <NumberField
            step={0.001}
            label="Attenuation"
            {...register("attenuation")}
          />
          <NumberField label="Temp Low" {...register("tempLow")} />
          <NumberField label="Temp High" {...register("tempHigh")} />
        </div>
      </div>
    </Form>
  );
}

export default YeastEditor;
