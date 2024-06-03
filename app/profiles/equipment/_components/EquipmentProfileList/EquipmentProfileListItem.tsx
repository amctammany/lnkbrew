import { EquipmentProfileIcon } from "@/components/Icon/EquipmentProfileIcon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { EquipmentProfile } from "@prisma/client";

export type EquipmentProfileListItemProps = {
  profile?: EquipmentProfile;
};
export const EquipmentProfileListItem = ({
  profile,
}: EquipmentProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/equipment/${profile?.slug}`}>
      <ListItemIcon>
        <EquipmentProfileIcon />
      </ListItemIcon>
      <ListItemText primary={profile?.name} secondary={profile?.description!} />
    </ListItem>
  );
};
