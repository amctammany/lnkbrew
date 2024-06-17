"use client";
import { IconButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { Style } from "@prisma/client";
import { StylesList } from "../StylesList";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useMemo, useState } from "react";
import { TextField } from "@/components/Form";
export type StyleListProps = {
  styles?: Style[];
};
const StylesActions = () => {
  return <></>;
};

export const StyleSearch = ({ styles = [] }: StyleListProps) => {
  const [query, setQuery] = useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(
    () => (e) => {
      setQuery(e.currentTarget.value);
    },
    [setQuery]
  );
  const filtered = styles.filter((style) =>
    style.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Section variant="primary" header="Styles" actions={<StylesActions />}>
      <TextField
        type="search"
        name="query"
        onChange={handleChange}
        value={query}
      />
      <StylesList styles={filtered} />
    </Section>
  );
};
