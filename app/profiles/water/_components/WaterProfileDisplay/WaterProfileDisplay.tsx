import { IconButtonLink } from "@/components/Button";
import { FavButton } from "@/components/Button/FavButton";
import { EditIcon } from "@/components/Icon/EditIcon";
import { ForkIcon } from "@/components/Icon/ForkIcon";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { UserPreferences, WaterProfile } from "@prisma/client";
import React from "react";

export type WaterProfileDisplayProps = {
  profile?: WaterProfile | null;
  preferences?: UserPreferences;
  action?: any;
};
export const WaterProfileDisplay = ({
  profile,
  preferences,
  action,
}: WaterProfileDisplayProps) => {
  return (
    <Section
      header={profile?.name}
      icon="WaterProfileIcon"
      actions={
        <>
          <FavButton
            id={profile?.id}
            name="sourceWaterProfileId"
            label="Source"
            //isActive={preferences?.sourceWaterProfileId === profile?.id}
            //action={action?.bind(
            //null,
            //preferences?.userId,
            //"sourceWaterProfileId"
            //)}
          />
          <FavButton
            id={profile?.id}
            name="targetWaterProfileId"
            label="Target"
            //isActive={preferences?.targetWaterProfileId === profile?.id}
            //action={action?.bind(
            //null,
            //preferences?.userId,
            //"targetWaterProfileId"
            //)}
          />

          <IconButtonLink
            href={`/profiles/water/${profile?.slug}/fork`}
            Icon={ForkIcon}
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/profiles/water/${profile?.slug}/edit`}
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
        <Prop label="Calcium" unit="ppm">
          {profile?.calcium}
        </Prop>
        <Prop label="Magnesium" unit="ppm">
          {profile?.magnesium}
        </Prop>
        <Prop label="Sodium" unit="ppm">
          {profile?.sodium}
        </Prop>
        <Prop label="Sulfate" unit="ppm">
          {profile?.sulfate}
        </Prop>
        <Prop label="Chloride" unit="ppm">
          {profile?.chloride}
        </Prop>
        <Prop label="Bicarbonate" unit="ppm">
          {profile?.bicarbonate}
        </Prop>
      </div>
    </Section>
  );
};

export default WaterProfileDisplay;
