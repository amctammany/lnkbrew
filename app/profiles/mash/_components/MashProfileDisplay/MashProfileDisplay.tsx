import { IconButtonLink } from "@/components/Button";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { MashProfile } from "@prisma/client";
import React from "react";

export type MashProfileDisplayProps = {
  profile?: MashProfile | null;
};
export const MashProfileDisplay = ({ profile }: MashProfileDisplayProps) => {
  return (
    <Section
      header={profile?.name}
      icon="MashProfileIcon"
      actions={
        <>
          <IconButtonLink
            href={`/profiles/mash/${profile?.slug}/fork`}
            iconType="EditIcon"
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/profiles/mash/${profile?.slug}/edit`}
            iconType="EditIcon"
          >
            Edit
          </IconButtonLink>
        </>
      }
    >
      <div className="p-4">
        <Prop label="Name">{profile?.name}</Prop>
        <Prop label="Description">{profile?.description}</Prop>
      </div>
    </Section>
  );
};

export default MashProfileDisplay;
