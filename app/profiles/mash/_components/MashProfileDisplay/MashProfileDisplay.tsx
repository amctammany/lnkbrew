import { IconButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { MashProfile } from "@prisma/client";
import React from "react";
import { MashStepListItem } from "./MashStepListItem";
import { type ExtendedMashProfile } from "@/types/Profile";

export type MashProfileDisplayProps = {
  profile?: ExtendedMashProfile | null;
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
      <Section>
        <List>
          {(profile?.steps || []).map((step, index) => (
            <MashStepListItem key={step.id} step={step} index={index} />
          ))}
        </List>
      </Section>
    </Section>
  );
};

export default MashProfileDisplay;
