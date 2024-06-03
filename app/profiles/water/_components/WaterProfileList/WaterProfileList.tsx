import { ButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Section } from "@/components/Section";
import { WaterProfile } from "@prisma/client";
import { WaterProfileListItem } from "./WaterProfileListItem";
export type WaterProfileListProps = {
  profiles?: WaterProfile[];
};
const WaterProfilesActions = () => {
  return (
    <div>
      <ButtonLink href="/profiles/water/new">New</ButtonLink>
    </div>
  );
};

export const WaterProfileList = ({ profiles }: WaterProfileListProps) => {
  return (
    <Section
      variant="primary"
      header="Water Profiles"
      actions={<WaterProfilesActions />}
    >
      <List>
        {(profiles || []).map((profile) => (
          <WaterProfileListItem key={profile?.id} profile={profile} />
        ))}
      </List>
    </Section>
  );
};
