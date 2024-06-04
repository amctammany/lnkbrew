import { ButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Section } from "@/components/Section";
import { MashProfile } from "@prisma/client";
import { MashProfileListItem } from "./MashProfileListItem";
export type MashProfileListProps = {
  profiles?: MashProfile[];
};
const MashProfilesActions = () => {
  return (
    <div>
      <ButtonLink href="/profiles/mash/new">New</ButtonLink>
    </div>
  );
};

export const MashProfileList = ({ profiles }: MashProfileListProps) => {
  return (
    <Section
      variant="primary"
      header="Mash Profiles"
      actions={<MashProfilesActions />}
    >
      <List>
        {(profiles || []).map((profile) => (
          <MashProfileListItem key={profile?.id} profile={profile} />
        ))}
      </List>
    </Section>
  );
};
