import Folder from "./svgr/Folder";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const FolderIcon = ({ variant, size, className }: IconProps) => (
  <Folder className={clsx(iconStyles({ variant, size }), className)} />
);
