import { List } from "@/components/List/List";
import { WaterProfile } from "@prisma/client";
import { WaterProfileListItem } from "./WaterProfileListItem";
export type WaterProfileListProps = {
  profiles?: WaterProfile[];
};
export const WaterProfileList = ({ profiles = [] }: WaterProfileListProps) => {
  return (
    <List className="p-6">
      {(profiles || []).map((profile) => (
        <WaterProfileListItem key={profile?.id} profile={profile} />
      ))}
    </List>
  );
};
