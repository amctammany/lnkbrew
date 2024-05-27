"use client";
//import Link, { LinkProps } from "next/link";
import { IconProps } from "../Icon/Icon";
import { ButtonProps } from "./Button";
import { IconNames } from "../Icon";
import { useState } from "react";
import { IconButton } from "./IconButton";

export type ToggleButtonProps = ButtonProps & {
  //Icon: typeof Icon;
  iconVariant?: IconProps["variant"];
  iconType: IconNames;
  activeIconType: IconNames;
  defaultIconType: IconNames;
  active: boolean;
};
export const ToggleButton = ({
  //Icon,
  iconVariant,
  iconType,
  children,
  active: _active,
  activeIconType,
  defaultIconType,
  ...props
}: ToggleButtonProps) => {
  const [active, setActive] = useState(_active);
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setActive((a) => !a);
    if (props.onClick) props.onClick(e);
  };
  return (
    <IconButton
      {...props}
      iconType={(active ? activeIconType : defaultIconType) ?? iconType}
      variant={active ? "warning" : "default"}
      onClick={handleToggle}
    >
      {children}
    </IconButton>
  );
};
