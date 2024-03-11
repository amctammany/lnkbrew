import { IconProps } from "../Icon/Icon";
import { Icons, type IconNames } from "../Icon/index";

export type AppIconProps = Omit<IconProps, "Svg"> & {
  type: IconNames;
};
export function AppIcon({ type, ...props }: AppIconProps) {
  const Icon = Icons[type];
  return Icon ? <Icon {...props} /> : <></>;
}

export default AppIcon;
