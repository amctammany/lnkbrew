import React from "react";
import { Section } from "./Section";
export type ClientSectionProps = {
  children?: React.ReactNode;
};
export function ClientSection({ children }: ClientSectionProps) {
  return (
    <Section>
      <div>client section</div>
      {children}
    </Section>
  );
}

export default ClientSection;
