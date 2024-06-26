import Recipe from "./svgr/Recipe";
import clsx from "clsx";
import { IconProps, iconStyles } from "./Icon";

export const RecipeIcon = ({ variant, size, className }: IconProps) => (
  <Recipe className={clsx(iconStyles({ variant, size }), className)} />
);
