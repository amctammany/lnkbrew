import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { WaterProfile } from "@prisma/client";

export type WaterProfileListItemProps = {
  profile?: WaterProfile;
};
export const WaterProfileListItem = ({
  profile,
}: WaterProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/water/${profile?.slug}`}>
      <ListItemIcon>
        <WaterProfileIcon />
      </ListItemIcon>
      <ListItemText primary={profile?.name} secondary={profile?.description!} />
    </ListItem>
  );
};
