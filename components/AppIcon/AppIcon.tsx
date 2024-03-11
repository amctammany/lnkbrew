import { IconProps } from "../Icon/Icon";
import { Icons, type IconNames } from "../Icon/index";

export type AppIconProps = IconProps & {
  type: IconNames;
};
export function AppIcon({ type, ...props }: AppIconProps) {
  const Icon = Icons[type];
  return <Icon {...props} />;
}

export default AppIcon;
