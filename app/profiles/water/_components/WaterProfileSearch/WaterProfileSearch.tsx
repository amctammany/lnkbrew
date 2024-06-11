"use client";
import { IconButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { WaterProfile } from "@prisma/client";
import { WaterProfileList } from "../WaterProfileList";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useMemo, useState } from "react";
import { TextField } from "@/components/Form";
export type WaterProfileListProps = {
  profiles?: WaterProfile[];
};
const WaterProfilesActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/profiles/water/new">
        New
      </IconButtonLink>
    </>
  );
};

export const WaterProfileSearch = ({
  profiles = [],
}: WaterProfileListProps) => {
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
      header="Water Profiles"
      actions={<WaterProfilesActions />}
    >
      <TextField
        type="search"
        name="query"
        onChange={handleChange}
        value={query}
      />
      <WaterProfileList profiles={filtered} />
    </Section>
  );
};
