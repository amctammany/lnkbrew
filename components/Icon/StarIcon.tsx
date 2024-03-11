import Star from "@heroicons/react/24/outline/StarIcon";
import StarSolid from "@heroicons/react/24/solid/StarIcon";
import { Icon, IconProps } from "./Icon";

export const StarIcon = (props: IconProps) => <Icon Svg={Star} {...props} />;
export const StarSolidIcon = (props: IconProps) => (
  <Icon Svg={StarSolid} {...props} />
);
