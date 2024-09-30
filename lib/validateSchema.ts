import { FieldError } from "react-hook-form";
import { ZodError, ZodIssue, ZodSchema, z } from "zod";
export type SchemaFieldError = FieldError & {
  extra?: string;
};
type H<T> =
  | {
      success: true;
      data: T;
      errors: never;
    }
  | { success: false; errors: Record<keyof T, ZodIssue>; data: never };
export function validateSchema<
  T extends ZodSchema,
  S extends H<T> = H<T>
  //T["safeParse"]
  //> & { errors: undefined }
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: T): S {
  //try {
  const valid = schema.safeParse(formData);
  if (!valid.success) {
    return {
      success: valid.success,
      data: undefined,
      errors: Object.entries(valid.error.issues)?.reduce((acc, [n, issue]) => {
        acc[issue.path.join(".")] = issue;
        return acc;
      }, {} as Record<string, ZodIssue>),
    } as S;
  } else {
    return {
      success: valid.success,
      data: valid.data,
      errors: undefined,
    } as S;
  }
  //} catch (e: any) {
  //}
}
