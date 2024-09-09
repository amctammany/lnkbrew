"use client";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { ClientTable } from "@/components/ClientTable";
import { Direction, TableFilter } from "@/components/Table/types";
import { fuzzyFilter } from "@/lib/fuzzyFilter";
import { Fermentable } from "@prisma/client";
import {
  ColumnDef,
  ColumnFiltersState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Label } from "@/components/Label";
import { AddIcon } from "@/components/Icon/AddIcon";
import { GrainIcon } from "@/components/Icon/GrainIcon";
const FermentableUsageWithBlank = { "": "" }; //{ "": "", ...FermentableUsage };

export type FermentablesTableProps = {
  fermentables: Fermentable[];
  sort?: keyof Fermentable;
  direction?: Direction;
};
export const FermentablesTable = ({
  fermentables,
  sort,
  direction,
}: FermentablesTableProps) => {
  const columns = useMemo<ColumnDef<Fermentable, any>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        filterFn: "includesString",
        cell: ({ cell, row }) => (
          <Link
            className="underline visited:text-violet-300"
            href={`/ingredients/fermentables/${row.original.slug}`}
          >
            {cell.getValue()}
          </Link>
        ),
      },

      {
        accessorKey: "country",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "maxUsage",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "color",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "potential",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: fermentables,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    //getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  const filters = useMemo<TableFilter<Fermentable>[]>(
    () => [{ type: "text", name: "name" }],
    []
  );

  return (
    <Section
      header="Fermentables"
      Icon={GrainIcon}
      actions={
        <ButtonLink href="/ingredients/fermentables/new">
          <Label text="New">
            <AddIcon />
          </Label>
        </ButtonLink>
      }
    >
      <ClientTable
        //className="my-2"
        //table={table}
        data={fermentables}
        columns={columns}
        filters={filters}
      />
    </Section>
  ); // <ClientTable table={table} filters={filters} />;
  /**
  return (
    <div className="">
      <ClientSection
        className="lg:px-16"
        closed={false}
        header={
          <TextField
            name="query"
            value={globalFilter ?? ""}
            onChange={({ target: { value } }) => setGlobalFilter(String(value))}
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
          <div className="grid grid-flow-col gap-2">
            <Select
              name="usage"
              value={table.getColumn("usage")?.getFilterValue()}
              onChange={({ target: { value } }) =>
                table.getColumn("usage")?.setFilterValue(value)
              }
              className="p-2 font-lg shadow border border-block"
              options={FermentableUsageWithBlank}
            />
          </div>
        </Section>
      </ClientSection>
      <div className="overflow-x-scroll w-full">
        <Table
          table={table}
          //src={fermentables}
          //filters={{ name: "string" }}
          //columns={columns}
          //selectActions={{
          //Compare: "/ingredients/fermentables/compare",
          //Combine: "/ingredients/fermentables/combine",
          //}}
        />
      </div>
    </div>
  );
   */
};
