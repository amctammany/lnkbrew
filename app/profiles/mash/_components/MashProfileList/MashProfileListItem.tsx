import { MashProfileIcon } from "@/components/Icon/MashProfileIcon";
import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { MashProfile } from "@prisma/client";

export type MashProfileListItemProps = {
  profile?: MashProfile;
};
export const MashProfileListItem = ({ profile }: MashProfileListItemProps) => {
  return (
    <ListItem key={profile?.id} href={`/profiles/mash/${profile?.slug}`}>
      <ListItemIcon>
        <MashProfileIcon />
      </ListItemIcon>
      <ListItemText primary={profile?.name} secondary={profile?.description!} />
    </ListItem>
  );
};
