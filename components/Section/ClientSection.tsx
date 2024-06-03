"use client";
import React, { useState } from "react";
import { Section, SectionProps } from "./Section";
import { ToggleButton } from "../Button/ToggleButton";
export type ClientSectionProps = SectionProps & {
  children?: React.ReactNode;
  toggleLabel?: string | React.ReactNode;
  closed?: boolean;
};
export function ClientSection({
  children,
  closed = false,
  toggleLabel = "Toggle",
  header,
  ...props
}: ClientSectionProps) {
  const [open, setOpen] = useState(!closed);
  const handleToggle = () => setOpen((o) => !o);
  return (
    <Section
      header={header}
      actions={
        <ToggleButton
          direction="default"
          //activeIconVariant="warning"
          //activeVariant="success"
          onToggle={handleToggle}
        >
          {toggleLabel}
        </ToggleButton>
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
