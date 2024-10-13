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
  profile: ExtendedEquipmentProfile;
  //preferences: UnitPrefs;
  action?: any;
};
export const EquipmentProfileDisplay = ({
  profile,
}: //preferences,
//preferences,
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

        <PrefAmountProp
          label="Batch Volume"
          type="volume"
          value={profile?.batchVolume}
        />
        <PrefAmountProp
          label="Boil Time"
          type="time"
          value={profile?.boilTime}
        />
        <PrefAmountProp
          label="Boil Off Rate"
          type="flow"
          value={profile.boilOffRate}
        />
        <PrefAmountProp
          label="Trub Loss"
          type="volume"
          value={profile.trubLoss}
        />
        <PrefAmountProp
          label="Fermenter Loss"
          type="volume"
          value={profile.fermenterLoss}
        />
        <PrefAmountProp
          label="Mash Loss"
          type="volume"
          value={profile.mashLoss}
        />
        <PrefAmountProp
          label="Mash Efficiency"
          type="percent"
          value={profile.mashEfficiency}
        />
        <PrefAmountProp
          label="Brew Efficiency"
          type="percentage"
          value={profile.brewEfficiency}
        />
      </div>
    </Section>
  );
};

export default EquipmentProfileDisplay;
