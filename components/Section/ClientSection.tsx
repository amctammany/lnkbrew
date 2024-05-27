"use client";
import React, { useState } from "react";
import { Section, SectionProps } from "./Section";
import Button from "../Button/Button";
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
      actions={<Button onClick={handleToggle}>X</Button>}
      collapsed={open ? "default" : "collapsed"}
      {...props}
    >
      {children}
    </Section>
  );
}

export default ClientSection;
