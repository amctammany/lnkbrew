import { CubeIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const EquipmentProfileIcon = ({
  variant,
  size,
  className,
}: IconProps) => (
  <CubeIcon className={clsx(iconStyles({ variant, size }), className)} />
);
