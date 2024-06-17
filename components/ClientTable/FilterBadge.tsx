import { MouseEventHandler } from "react";
import { CloseIcon } from "../Icon/CloseIcon";

export type FilterBadgeProps = {
  label?: string;
  value?: any;
  remove: MouseEventHandler<HTMLButtonElement>;
};
export function FilterBadge({ remove, label, value }: FilterBadgeProps) {
  return (
    <div className="flex text-base border border-black bg-white rounded-md">
      <span className="bg-slate-200 uppercase p-2 rounded-l-md">{label}</span>
      <span className="text-center flex-grow py-2 px-4">
        {value.toString()}
      </span>
      <button
        name={label}
        className="my-auto hover:text-warning-800"
        onClick={remove}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
