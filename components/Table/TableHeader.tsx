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
import {
  FilterFn,
  Header,
  SortDirection,
  SortingFn,
  flexRender,
  sortingFns,
} from "@tanstack/react-table";
import { Icon as IconClass } from "../Icon/Icon";
import { DownIcon } from "../Icon/DownIcon";
import { UpIcon } from "../Icon/UpIcon";

type Active = "ASC" | "DESC";
export type TableHeaderProps<
  H extends Header<S, T> = Header<any, any>,
  S = unknown,
  T = unknown,
> = VariantProps<typeof tableHeaderStyles> &
  ComponentProps<"th"> & {
    name?: string;
    label?: string;
    active?: Active;
    Header?: React.FC<HeaderProps>;
    header: H;
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
export type HeaderProps = VariantProps<typeof tableHeaderStyles> & {
  name?: string;
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
const directionIcons: Record<SortDirection | "default", typeof IconClass> = {
  asc: UpIcon,
  desc: DownIcon,
  default: IconClass,
};
export const TableHeader = ({
  //name,
  //label,
  active,
  header,
  variant,
  Header: _Header,
  className,
  //children,
}: TableHeaderProps) => {
  //const Header = _Header ?? DefaultHeader;
  const Icon = directionIcons[header.column.getIsSorted() || "default"];
  return (
    <th className={clsx(tableHeaderStyles({ active, variant }), className)}>
      <div className="flex" onClick={header.column.getToggleSortingHandler()}>
        <b className="flex-grow">
          {header?.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </b>
        <span className="flex-shrink w-6">
          <Icon />
        </span>
      </div>
    </th>
  );
};
