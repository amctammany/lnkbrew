"use client";
import { IconButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { EquipmentProfile } from "@prisma/client";
import { EquipmentProfileList } from "../EquipmentProfileList";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useMemo, useState } from "react";
import { TextField } from "@/components/Form";
import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
export type EquipmentProfileListProps = {
  profiles?: EquipmentProfile[];
};
const EquipmentProfilesActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/profiles/equipment/new">
        New
      </IconButtonLink>
    </>
  );
};

export const EquipmentProfileSearch = ({
  profiles = [],
}: EquipmentProfileListProps) => {
  const [query, setQuery] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(
    () => (e) => {
      setQuery(e.currentTarget.value);
    },
    [setQuery]
  );
  const filtered = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Section
      variant="primary"
      header="Equipment Profiles"
      Icon={EquipmentProfileIcon}
      actions={<EquipmentProfilesActions />}
    >
      <TextField
        type="search"
        name="query"
        onChange={handleChange}
        value={query}
      />
      <EquipmentProfileList profiles={filtered} />
    </Section>
  );
};
