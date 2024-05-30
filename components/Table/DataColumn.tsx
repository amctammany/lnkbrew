import { DataColumnProps } from "./types";

export function DataColumn<
  T extends Record<string, any> = Record<string, any>,
>({ label }: DataColumnProps<T>) {
  return <th>{label}</th>;
}
