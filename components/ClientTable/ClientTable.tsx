import { VariantProps, cva } from "class-variance-authority";
import React, { HTMLProps, useMemo, useState } from "react";
import { Table, TableProps } from "../Table";
import clsx from "clsx";
import { ClientSection, Section } from "../Section";
import { Select, TextField } from "../Form";
import { Button } from "../Button";
import ClientTableFilter from "./ClientTableFilter";
import { TableFilter } from "../Table/types";
import {
  ColumnDef,
  ColumnFilter,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TableType,
  RowSelectionState,
} from "@tanstack/react-table";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import { FilterBar } from "./FilterBar";
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  checked,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      checked={checked}
      {...rest}
    />
  );
}
const clientTableStyles = cva("px-6 py-8 ", {
  variants: {
    variant: {
      default: [],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type ClientTableProps<T extends Record<string, any>> = VariantProps<
  typeof clientTableStyles
> & {
  data: T[];
  columns: ColumnDef<T>[];
  filters?: TableFilter<T>[];
  className?: string;
};
export function ClientTable<T extends Record<string, any>>({
  //table,
  data,
  columns,
  variant,
  filters,
  className,
}: ClientTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data,
    columns: [
      {
        id: "select-col",
        header: ({ table }) => (
          <IndeterminateCheckbox
            //type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      ...columns,
    ],
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      columnFilters,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    //debugTable: true,
    //debugHeaders: true,
    debugColumns: false,
  });

  const handleReset = useMemo(
    () => () => {
      table.resetRowSelection();
      table.resetGlobalFilter();
      table.resetColumnFilters();
    },
    [table]
  );

  return (
    <div className={clsx(clientTableStyles({ variant }), className)}>
      <ClientSection
        className=""
        closed={true}
        header={
          <TextField
            name="query"
            value={globalFilter ?? ""}
            onChange={({ target: { value } }) => setGlobalFilter(String(value))}
            className="p-0 font-lg border-block"
            placeholder="Search all columns..."
          />
        }
      >
        <Section
          header={<FilterBar table={table} />}
          size="small"
          variant="warning"
          actions={
            <>
              <Button onClick={handleReset}>Clear</Button>
            </>
          }
        >
          <div className="grid grid-flow-col gap-2">
            {filters?.map((filter) => (
              <ClientTableFilter
                key={filter.name.toString()}
                table={table}
                filter={filter}
              />
            ))}
          </div>
        </Section>
      </ClientSection>

      <div className="overflow-x-scroll">
        <Table table={table} variant={variant} />
      </div>
    </div>
  );
}

export default ClientTable;
