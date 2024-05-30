import React, { useState } from "react";
import { Searchbar } from "../Searchbar";
import { IconButton } from "../Button/IconButton";
import { UpIcon } from "../Icon/UpIcon";
import { DownIcon } from "../Icon/DownIcon";
import { TextField } from "../Form";

export type ClientTableSearchProps<Q extends Record<string, any>> = {
  filters?: Record<
    string,
    React.FC<{ className?: string; name: string; value?: any; onChange: any }>
  >;
  query?: Q;
  setQuery?: React.Dispatch<React.SetStateAction<Q>>;
};
export function ClientTableSearch<Q extends Record<string, any>>({
  query,
  filters,
  setQuery,
}: ClientTableSearchProps<Q>) {
  const [searchOpen, setSearchOpen] = useState(false);
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSearchOpen((o) => !o);
  };
  const handleQuery: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setQuery?.((o) => ({ ...o, [name]: value }));
  };

  return (
    <div className=" flex bg-slate-200">
      <div className="flex-grow flex p-0">
        <div
          className={`${
            searchOpen ? "hidden" : "block"
          } w-full grid grid-cols-3`}
        >
          {Object.entries(filters || {}).map(([q, Comp]) => (
            <Comp
              className=""
              key={q}
              name={q}
              value={query?.[q]}
              onChange={handleQuery}
            />
          ))}
        </div>
        <Searchbar
          className={`${searchOpen ? "block" : "hidden"} flex-grow `}
          name="name"
          value={query?.name}
          onChange={handleQuery}
        />
      </div>
      <div>
        <IconButton
          iconType={searchOpen ? "UpIcon" : "DownIcon"}
          onClick={handleToggle}
        >
          Filters
        </IconButton>
      </div>
    </div>
  );
}
export default ClientTableSearch;
