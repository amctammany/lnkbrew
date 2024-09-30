import { FieldError } from "react-hook-form";
import { ZodError, ZodIssue, ZodSchema, z } from "zod";
export type SchemaFieldError = FieldError & {
  extra?: string;
};
type ErrRes<T extends {}> = {
  success: false;
  errors: Record<keyof T, ZodIssue>;
  data: never;
};
type SuccessRes<T extends {}> = {
  success: true;
  errors: never;
  data: T;
};
type H<T extends {}> = SuccessRes<T> | ErrRes<T>;
export function validateSchema<
  T extends ZodSchema,
  S = H<T> //T["safeParse"]
  //> & { errors: undefined }
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: T) {
  //try {
  const valid = schema.safeParse(formData);
  if (!valid.success) {
    return {
      success: valid.success,
      errors: Object.entries(valid.error.issues)?.reduce((acc, [n, issue]) => {
        acc[issue.path.join(".")] = issue;
        return acc;
      }, {} as Record<string, ZodIssue>),
    } as S;
  } else {
    return {
      success: valid.success,
      data: valid.data,
      //errors: undefined,
    } as S;
  }
  //} catch (e: any) {
  //console.error(e);
  //}
}
