import { Table } from "@tanstack/react-table";
import { FilterBadge } from "./FilterBadge";
import { MouseEventHandler, useMemo } from "react";

export type FilterBarProps<T> = {
  table: Table<T>;
};
export function FilterBar<T>({ table }: FilterBarProps<T>) {
  const filters = table.getState().columnFilters;
  const handleRemove: MouseEventHandler<HTMLButtonElement> = useMemo(
    () => (e) => {
      const name = e.currentTarget.name;

      table.setColumnFilters((old) => old.filter(({ id }) => id !== name));
    },
    [table]
  );
  return (
    <div className="flex">
      {filters.map(({ id, value }) => (
        <FilterBadge key={id} label={id} value={value} remove={handleRemove} />
      ))}
    </div>
  );
}
