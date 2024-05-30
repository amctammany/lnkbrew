import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

type Active = "ASC" | "DESC";
export type TableHeaderProps = VariantProps<typeof tableHeaderStyles> &
  ComponentProps<"th"> & {
    name: string;
    label?: string;
    active?: Active;
    Header?: React.FC<HeaderProps>;
  };
const tableHeaderStyles = cva(["uppercase border border-slate-500"], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      ASC: ["underline"],
      DESC: ["underline"],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export type HeaderProps = {
  name: string;
  active?: Active;
  children?: React.ReactNode;
};
function DefaultHeader({ name, active, children }: HeaderProps) {
  return (
    <Link
      href={`?sort=${name}&direction=${active === "DESC" ? "ASC" : "DESC"}`}
    >
      {children}
    </Link>
  );
}
export const TableHeader = ({
  name,
  label,
  active,
  Header: _Header,
  className,
}: TableHeaderProps) => {
  const Header = _Header ?? DefaultHeader;
  return (
    <th className={clsx(tableHeaderStyles({ active }), className)}>
      <Header {...{ name, active }}>
        <div className="flex">
          <b className="flex-grow">{label || name}</b>
          <span className="flex-shrink w-6">
            {active &&
              (active === "ASC" ? (
                <ArrowUpIcon className="h-6 w-6" />
              ) : (
                <ArrowDownIcon className="h-6 w-6" />
              ))}
          </span>
        </div>
      </Header>
    </th>
  );
};
