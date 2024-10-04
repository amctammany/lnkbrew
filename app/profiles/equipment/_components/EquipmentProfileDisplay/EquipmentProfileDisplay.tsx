import { IconButtonLink } from "@/components/Button";
import { FavButton } from "@/components/Button/FavButton";
import { EditIcon } from "@/components/Icon/EditIcon";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { ForkIcon } from "@/components/Icon/ForkIcon";
import { StarIcon } from "@/components/Icon/StarIcon";
import { Prop } from "@/components/Prop";
import AmountProp from "@/components/Prop/AmountProp";
import { PrefAmountProp } from "@/components/Prop/PrefAmountProp";
import { Section } from "@/components/Section";
import { Toolbar } from "@/components/Toolbar";
import { ExtendedEquipmentProfile } from "@/types/Profile";
import { UnitPrefs } from "@/types/User";
import { EquipmentProfile, User, UserPreferences } from "@prisma/client";
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
  preferences: UnitPrefs;
  action?: any;
};
export const EquipmentProfileDisplay = ({
  profile,
  preferences,
}: //preferences,
//action,
EquipmentProfileDisplayProps) => {
  return (
    <Section
      Icon={EquipmentProfileIcon}
      header={profile?.name}
      collapsible
      actions={
        <>
          <FavButton
            id={profile?.id}
            name="equipmentProfileId"
            //isActive={preferences?.equipmentProfileId === profile?.id}
            //action={action?.bind(
            //null,
            //preferences?.userId,
            //"equipmentProfileId"
            //)}
          />

          <IconButtonLink
            href={`/profiles/equipment/${profile?.slug}/fork`}
            Icon={ForkIcon}
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

        <PrefAmountProp
          label="Batch Volume"
          type="volume"
          value={profile?.batchVolume ?? 0}
        />
        <Prop
          label="Boil Time"
          unit={preferences["time"]}
          value={profile?.boilTime}
        />
        <Prop
          label="Boil Off Rate"
          unit={preferences["flow"]}
          value={profile?.boilOffRate}
        />
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
