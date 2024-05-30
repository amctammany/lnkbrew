import { Dispatch, useCallback } from "react";
import { RowProps } from "../Table/TableRow";
import { VariantProps, cva } from "class-variance-authority";
const tableRowStyles = cva([""], {
  variants: {
    variant: {
      default: [""],
    },
    active: {
      selected: ["underline", "bg-teal-200"],
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
    active: "default",
  },
});

export type ClientRowProps = VariantProps<typeof tableRowStyles> &
  RowProps & {
    _id: number;
    active?: any;
    name?: string;
    selected: number[];
    setSelected: Dispatch<React.SetStateAction<number[]>>;
    children?: React.ReactNode;
  };
export function ClientRow({
  name,
  variant,
  _id,
  selected,
  setSelected,
  children,
  ...props
}: ClientRowProps) {
  const onClick = useCallback(() => {
    const index = selected.indexOf(_id);
    setSelected((old) =>
      index >= 0 ? old.filter((id) => id !== _id) : [...old, _id]
    );
    //console.log(selected, _id);
  }, [setSelected, selected, _id]);
  const active = selected.indexOf(_id) >= 0 ? "selected" : "default";
  return (
    <tr
      className={tableRowStyles({ variant, active })}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
}
/**
     <td>
        <input
          type="checkbox"
          checked={selected.indexOf(_id) >= 0}
          onClick={onClick}
        />
      </td>

   */
