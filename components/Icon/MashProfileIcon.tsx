import { NumberedListIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const MashProfileIcon = ({ variant, size, className }: IconProps) => (
  <NumberedListIcon
    className={clsx(iconStyles({ variant, size }), className)}
  />
);
