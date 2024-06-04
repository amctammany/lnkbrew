import { IconButtonLink } from "@/components/Button";
import { Prop } from "@/components/Prop";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { ExtendedEquipmentProfile } from "@/types/Profile";
import { EquipmentProfile, User } from "@prisma/client";
import React from "react";
const numberFieldNames: [keyof EquipmentProfile, string][] = [
  ["batchVolume", "gal"],
  ["boilTime", "min"],
  ["boilOffRate", "gal/hr"],
  ["trubLoss", "gal"],
  ["fermenterLoss", "gal"],
  ["mashLoss", "gal"],
  ["mashEfficiency", "%"],
  ["brewEfficiency", "%"],
];

export type EquipmentProfileDisplayProps = {
  profile?: ExtendedEquipmentProfile;
};
export const EquipmentProfileDisplay = ({
  profile,
}: EquipmentProfileDisplayProps) => {
  return (
    <Section
      header={profile?.name}
      actions={
        <>
          <IconButtonLink
            href={`/profiles/equipment/${profile?.slug}/fork`}
            iconType="StarIcon"
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/profiles/equipment/${profile?.slug}/edit`}
            iconType="EditIcon"
          >
            Edit
          </IconButtonLink>
        </>
      }
    >
      <div className="p-4">
        <Prop label="Name">{profile?.name}</Prop>
        <Prop label="Owner">{profile?.owner?.name}</Prop>
        <Prop label="Description">{profile?.description}</Prop>
        <Prop label="Batch Volume" unit="gal">
          {profile?.batchVolume}
        </Prop>

        <Prop label="Boil Time" unit="min">
          {profile?.boilTime}
        </Prop>
        <Prop label="Boil Off Rate" unit="gal/hr">
          {profile?.boilOffRate}
        </Prop>
        <Prop label="Trub Loss" unit="gal">
          {profile?.trubLoss}
        </Prop>
        <Prop label="Fermenter Loss" unit="gal">
          {profile?.fermenterLoss}
        </Prop>
        <Prop label="Mash Loss" unit="gal">
          {profile?.mashLoss}
        </Prop>
        <Prop label="Mash Efficiency" unit="%">
          {profile?.mashEfficiency}
        </Prop>
        <Prop label="Brew Efficiency" unit="%">
          {profile?.brewEfficiency}
        </Prop>
      </div>
    </Section>
  );
};

export default EquipmentProfileDisplay;
