"use client";
import { IconButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { MashProfile } from "@prisma/client";
import { MashProfileList } from "../MashProfileList";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useMemo, useState } from "react";
import { TextField } from "@/components/Form";
import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
export type MashProfileListProps = {
  profiles?: MashProfile[];
};
const MashProfilesActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/profiles/mash/new">
        New
      </IconButtonLink>
    </>
  );
};

export const MashProfileSearch = ({ profiles = [] }: MashProfileListProps) => {
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
      Icon={MashProfileIcon}
      header="Mash Profiles"
      actions={<MashProfilesActions />}
    >
      <TextField
        type="search"
        name="query"
        onChange={handleChange}
        value={query}
      />
      <MashProfileList profiles={filtered} />
    </Section>
  );
};
