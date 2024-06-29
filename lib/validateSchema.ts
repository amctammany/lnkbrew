import { FieldError } from "react-hook-form";
import { ZodError, ZodIssue, ZodSchema, z } from "zod";
export type SchemaFieldError = FieldError & {
  extra?: string;
};
export function validateSchema<
  T extends ZodSchema,
  S = ReturnType<T["parse"]>,
  //S extends any //<T> = ZodEffects<T>
>(formData: FormData, schema: T): S & { errors?: Record<string, ZodIssue> } {
  try {
    const data = schema.parse(formData);
    return data as z.infer<T>;
  } catch (e: any) {
    return {
      errors: (e as ZodError).issues.reduce(
        (acc, issue) => {
          acc[issue.path.join(".")] = issue;
          return acc;
        },
        {} as Record<string, ZodIssue>
      ),
    } as S & { errors?: Record<string, ZodIssue> };
  }
}
