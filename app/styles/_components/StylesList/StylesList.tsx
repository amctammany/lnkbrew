import { List } from "@/components/List/List";
import { Section } from "@/components/Section/Section";
import { Style } from "@prisma/client";
import { StyleListItem } from "./StyleListItem";

export type StylesListProps = {
  styles: Style[];
};

export const StylesList = ({ styles }: StylesListProps) => {
  return (
    <Section title="Styles">
      <List>
        {styles.map((style) => (
          <StyleListItem key={style.id} style={style} />
        ))}
      </List>
    </Section>
  );
};
