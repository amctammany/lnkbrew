export type DataColumnProps<
  T extends Record<string, any> = Record<string, any>,
> = {
  name: keyof T;
  label?: string;
  href?: string | ((src: T) => string);
};
export type Direction = "ASC" | "DESC";
