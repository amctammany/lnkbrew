export type DataColumnProps<
  T extends Record<string, any> = Record<string, any>,
> = {
  name: keyof T;
  label?: string;
  href?: string | ((src: T) => string);
};
export type Direction = "ASC" | "DESC";
export type TableFilterType = "text" | "select";
export type TableFilter<T extends Record<string, any>> = {
  type: TableFilterType;
  name: keyof T;
  options?: Record<string, string>;
};
