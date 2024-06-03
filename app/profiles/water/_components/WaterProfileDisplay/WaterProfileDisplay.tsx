import { IconButtonLink } from "@/components/Button";
import { Prop } from "@/components/Prop";
import { Toolbar } from "@/components/Toolbar";
import { WaterProfile } from "@prisma/client";
import React from "react";

export type WaterProfileDisplayProps = {
  profile?: WaterProfile | null;
};
export const WaterProfileDisplay = ({ profile }: WaterProfileDisplayProps) => {
  return (
    <div>
      <Toolbar variant="topbar" title={profile?.name}>
        <IconButtonLink
          href={`/profiles/water/${profile?.slug}/edit`}
          iconType="EditIcon"
        >
          Edit
        </IconButtonLink>
      </Toolbar>
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
    </div>
  );
};

export default WaterProfileDisplay;