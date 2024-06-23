import { IconButtonLink } from "@/components/Button";
import { EditIcon } from "@/components/Icon/EditIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
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
            Icon={StarIcon}
          >
            Fork
          </IconButtonLink>

          <IconButtonLink
            href={`/profiles/equipment/${profile?.slug}/edit`}
            Icon={EditIcon}
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
        <AmountProp
          label="Batch Volume"
          unitType="volume"
          value={profile?.batchVolume}
        />

        <AmountProp label="Boil Time" unitType="time">
          {profile?.boilTime}
        </AmountProp>
        <AmountProp
          value={profile?.boilOffRate}
          label="Boil Off Rate"
          unitType="flow"
          //unit="gal/hr"
        />
        <AmountProp
          label="Trub Loss"
          unitType="volume"
          value={profile?.trubLoss}
        />
        <AmountProp
          label="Fermenter Loss"
          unitType="volume"
          value={profile?.fermenterLoss}
        />
        <AmountProp
          label="Mash Loss"
          unitType="volume"
          value={profile?.mashLoss}
        />
        <AmountProp
          label="Mash Efficiency"
          unitType="percent"
          value={profile?.mashEfficiency}
        />
        <AmountProp
          label="Brew Efficiency"
          unitType="percent"
          value={profile?.brewEfficiency}
        />
      </div>
    </Section>
  );
};

export default EquipmentProfileDisplay;
