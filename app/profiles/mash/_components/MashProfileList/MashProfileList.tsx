import { List } from "@/components/List/List";
import { MashProfile } from "@prisma/client";
import { MashProfileListItem } from "./MashProfileListItem";
export type MashProfileListProps = {
  profiles?: MashProfile[];
};

export const MashProfileList = ({ profiles }: MashProfileListProps) => {
  return (
    <List>
      {(profiles || []).map((profile) => (
        <MashProfileListItem key={profile?.id} profile={profile} />
      ))}
    </List>
  );
};
