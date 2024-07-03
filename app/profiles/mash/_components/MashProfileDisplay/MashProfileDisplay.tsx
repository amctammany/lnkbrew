import { IconButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { MashProfile, UserPreferences } from "@prisma/client";
import React from "react";
import { MashStepListItem } from "./MashStepListItem";
import { type ExtendedMashProfile } from "@/types/Profile";
import { EditIcon } from "@/components/Icon/EditIcon";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import FavButton from "@/components/Button/FavButton";
import { toggleUserFavorite } from "@/app/admin/actions";

export type MashProfileDisplayProps = {
  profile?: ExtendedMashProfile | null;
  preferences?: UserPreferences;
  action?: any;
};
export const MashProfileDisplay = ({
  profile,
  action,
  preferences,
}: MashProfileDisplayProps) => {
  console.log(preferences);
  return (
    <Section
      header={profile?.name}
      Icon={MashProfileIcon}
      actions={
        <>
          <FavButton
            id={profile?.id}
            name="mashProfileId"
            //isActive={preferences?.mashProfileId === profile?.id}
            //action={action?.bind(null, preferences?.userId, "mashProfileId")}
          />

          <IconButtonLink
            href={`/profiles/mash/${profile?.slug}/fork`}
            Icon={EditIcon}
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/profiles/mash/${profile?.slug}/edit`}
            Icon={EditIcon}
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
