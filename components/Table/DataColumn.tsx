export type DataColumnProps<
  T extends Record<string, any> = Record<string, any>
> = {
  name: keyof T;
  label?: string;
  href?: string | ((src: T) => string);
};

export function DataColumn<
  T extends Record<string, any> = Record<string, any>
>({ label }: DataColumnProps<T>) {
  return <th>{label}</th>;
}
