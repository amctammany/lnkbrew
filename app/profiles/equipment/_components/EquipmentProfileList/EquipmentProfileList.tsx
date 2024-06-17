import { List } from "@/components/List/List";
import { EquipmentProfile } from "@prisma/client";
import { EquipmentProfileListItem } from "./EquipmentProfileListItem";
export type EquipmentProfileListProps = {
  profiles?: EquipmentProfile[];
};
export const EquipmentProfileList = ({
  profiles,
}: EquipmentProfileListProps) => {
  return (
    <List className="p-6">
      {(profiles || []).map((profile) => (
        <EquipmentProfileListItem key={profile?.id} profile={profile} />
      ))}
    </List>
  );
};
