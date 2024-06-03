import { VariantProps, cva } from "class-variance-authority";
import React, { useMemo } from "react";
import { Table, TableProps } from "./Table";
import clsx from "clsx";
import { ClientSection, Section } from "../Section";
import { Select, TextField } from "../Form";
import { Button } from "../Button";

const clientTableStyles = cva("", {
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
> &
  TableProps<T> & {};
function ClientTable<T extends Record<string, any>>({
  table,
  variant,
  className,
}: ClientTableProps<T>) {
  const handleReset = useMemo(
    () => () => {
      table.resetGlobalFilter();
      table.resetColumnFilters();
    },
    [table]
  );

  return (
    <div className={clsx(clientTableStyles({ variant }), className)}>
      <ClientSection
        className="lg:px-16"
        closed={false}
        header={
          <TextField
            name="query"
            value={table.getState().globalFilter ?? ""}
            onChange={({ target: { value } }) =>
              table.setGlobalFilter(String(value))
            }
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        }
      >
        <Section
          header="Filters"
          size="small"
          variant="warning"
          actions={
            <>
              <Button onClick={handleReset}>Clear</Button>
            </>
          }
        >
          <div className="grid grid-flow-col gap-2"></div>
        </Section>
      </ClientSection>

      <Table table={table} variant={variant} />
    </div>
  );
}

ClientTable.defaultProps = {};

ClientTable.propTypes = {};

export default ClientTable;