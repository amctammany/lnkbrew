import { Dispatch, useCallback } from "react";
import { Direction } from "../Table/Table";

export type ClientHeaderProps = {
  name: string;
  active?: Direction;
  sort?: string;
  setSort: Dispatch<React.SetStateAction<string>>;
  setDirection: Dispatch<React.SetStateAction<Direction>>;
  children?: React.ReactNode;
};
export function ClientHeader({
  name,
  sort,
  setSort,
  setDirection,
  children,
}: ClientHeaderProps) {
  const onClick = useCallback(() => {
    setSort(name);
    setDirection((old) => (sort === name && old === "DESC" ? "ASC" : "DESC"));
  }, [setSort, setDirection, name, sort]);
  return <div onClick={onClick}>{children}</div>;
}
