//import Recipe from "./svgr/Recipe";
//import clsx from "clsx";
import Icon, { IconProps, iconStyles } from "./Icon";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export const RecipeIcon = (props: IconProps) => (
  //<Recipe className={clsx(iconStyles({ variant, size }), className)} />
  <Icon Svg={DocumentTextIcon} {...props} />
);
