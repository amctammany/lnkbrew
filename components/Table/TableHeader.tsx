import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";
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
