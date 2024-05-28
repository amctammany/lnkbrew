"use client";
import React, { useState } from "react";
import { Section, SectionProps } from "./Section";
import Button from "../Button/Button";
import { ToggleButton } from "../Button/ToggleButton";
import { IconButton } from "../Button/IconButton";
export type ClientSectionProps = SectionProps & {
  children?: React.ReactNode;
  closed?: boolean;
};
export function ClientSection({
  children,
  closed,
  header,
  ...props
}: ClientSectionProps) {
  const [open, setOpen] = useState(closed ?? true);
  const handleToggle = () => setOpen((o) => !o);
  return (
    <Section
      header={header}
      actions={
        <ToggleButton
          //activeIconVariant="warning"
          //activeVariant="success"
          onToggle={handleToggle}
        />
      }
      collapsed={open ? "default" : "collapsed"}
      {...props}
    >
      {children}
    </Section>
  );
}

export default ClientSection;
/**
 *{
        <IconButton
          iconType={open ? "MinimizeIcon" : "MaximizeIcon"}
          onClick={handleToggle}
        />
      }
 */
