import { FieldError } from "react-hook-form";
import { ZodSchema } from "zod";
export type SchemaFieldError = FieldError & {
  extra?: string;
};
export function validateSchema<
  T extends ZodSchema,
  S = ReturnType<T["parse"]>,
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: T): S & { errors?: any[] } {
  try {
    const data = schema.parse(formData);
    return data;
  } catch (e: any) {
    return {
      errors: e.errors?.map((err: any) => ({
        ...err,
        path: err.path.join("."),
      })),
    } as S & { errors?: any[] };
  }
}
