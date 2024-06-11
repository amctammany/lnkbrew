import { IconButtonLink } from "@/components/Button";
import { List } from "@/components/List/List";
import { Section } from "@/components/Section";
import { MashProfile } from "@prisma/client";
import { MashProfileListItem } from "./MashProfileListItem";
import { AddIcon } from "@/components/Icon/AddIcon";
export type MashProfileListProps = {
  profiles?: MashProfile[];
};
const MashProfilesActions = () => {
  return (
    <>
      <IconButtonLink Icon={AddIcon} href="/profiles/water/new">
        New
      </IconButtonLink>
    </>
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
