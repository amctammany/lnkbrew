"use client";
//import Link, { LinkProps } from "next/link";
import { IconProps } from "../Icon/Icon";
import { ButtonProps } from "./Button";
import { IconNames } from "../Icon";
import { useState } from "react";
import { IconButton, IconButtonProps } from "./IconButton";

export type ToggleButtonProps = ButtonProps & {
  activeIconVariant?: IconProps["variant"];
  activeVariant?: ButtonProps["variant"];
  activeIconType?: IconNames;
  defaultIconType?: IconNames;
  onToggle?: React.MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
};
export const ToggleButton = ({
  children,
  active: _active,
  activeVariant,
  onToggle,
  ...props
}: ToggleButtonProps) => {
  const [active, setActive] = useState(_active);
  const handleToggle: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setActive((a) => !a);
    if (onToggle) onToggle(e);
  };
  const activeIconType = props.activeIconType ?? "CloseIcon";
  const defaultIconType = props.defaultIconType ?? "AddIcon";

  return (
    <IconButton
      {...props}
      iconType={!active ? activeIconType : defaultIconType}
      iconVariant={active ? props.activeIconVariant : null}
      variant={active ? activeVariant : props.variant}
      onClick={handleToggle}
    >
      {children}
    </IconButton>
  );
};
