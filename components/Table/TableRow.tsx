import Link from "next/link";
import { DataColumnProps } from "./DataColumn";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

export type TableRowProps<T extends Record<string, any>> = VariantProps<
  typeof tableRowStyles
> &
  ComponentProps<"tr"> & {
    data: T;
    _id: number;
    Row: ComponentProps<"tr"> & React.FunctionComponent<RowProps>;
    columns: DataColumnProps<T>[];
  };
const tableRowStyles = cva([""], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      selected: ["underline"],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    active: "default",
  },
});

export function TableRow<T extends Record<string, any> = Record<string, any>>({
  data,
  Row,
  columns,
  variant,
  active,
  ...props
}: TableRowProps<T>) {
  return (
    <Row variant={variant} key={data.id} {...props}>
      {columns.map(({ name, href }) => (
        <td
          className="border border-slate-400"
          key={`${data.id}-${name.toString()}`}
        >
          {href ? (
            <Link
              className="text-blue-600 visited:text-purple-600  underline"
              href={typeof href === "string" ? href : href(data)}
            >
              {data[name]}
            </Link>
          ) : (
            <p>{data[name]}</p>
          )}
        </td>
      ))}
    </Row>
  );
}
export type RowProps = { _id: number } & VariantProps<typeof tableRowStyles> &
  ComponentProps<"tr">;
const DefaultRow = ({ variant, ...props }: RowProps) => {
  return <tr className={tableRowStyles({ variant })} {...props} />;
};
export function makeTableRow<T extends Record<string, any>>(
  columns: DataColumnProps<T>[],
  _Row?: TableRowProps<T>["Row"]
) {
  return function CustomTableRow({
    ...props
  }: Omit<TableRowProps<T>, "columns" | "Row">) {
    const Row = _Row ?? DefaultRow;
    return <TableRow columns={columns} Row={Row} {...props} />;
  };
}
