import Link, { LinkProps } from "next/link";
import { Icon as IconClass, IconProps } from "../Icon/Icon";
import { Button, ButtonProps } from "./Button";
import { IconNames } from "../Icon";
import { VariantProps, cva } from "class-variance-authority";
import { Label } from "../Label";

const iconButtonStyles = cva(["flex px-1 text-sm -mx-2"], {
  variants: {
    direction: {
      default: [],
      reverse: ["flex-row-reverse"],
    },
  },
  defaultVariants: {
    direction: "default",
  },
});
export type IconButtonProps = ButtonProps &
  VariantProps<typeof iconButtonStyles> & {
    Icon: typeof IconClass;
    iconVariant?: IconProps["variant"];
    iconSize?: IconProps["size"];
    //iconType: IconNames;
  };
export const IconButton = ({
  Icon,
  iconVariant,
  iconSize,
  //iconType,
  direction,
  children,
  ...props
}: IconButtonProps) => {
  const body = (
    <div className={iconButtonStyles({ direction })}>
      <Label
        text={children}
        className="uppercase"
        textClassName="hidden md:block"
      >
        <Icon variant={iconVariant} size={iconSize} />
      </Label>
    </div>
  );
  return <Button {...props}>{body}</Button>;
};
