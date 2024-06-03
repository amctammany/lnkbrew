import { List } from "@/components/List/List";
import { Style } from "@prisma/client";
import { StyleListItem } from "./StyleListItem";
import { Section } from "@/components/Section";

export type StylesListProps = {
  styles: Style[];
};

export const StylesList = ({ styles }: StylesListProps) => {
  return (
    <Section title="Styles">
      <List className="p-4">
        {styles.map((style) => (
          <StyleListItem key={style.id} style={style} />
        ))}
      </List>
    </Section>
  );
};
