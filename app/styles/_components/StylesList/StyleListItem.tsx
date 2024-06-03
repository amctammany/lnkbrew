import { ListItem } from "@/components/List/ListItem";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
import { Style } from "@prisma/client";

export type StyleListItemProps = {
  style: Style;
};
export const StyleListItem = ({ style }: StyleListItemProps) => {
  return (
    <ListItem border="none" href={`/styles/${style.identifier}`}>
      <ListItemIcon variant="icon">
        <div className="text-lg ">{style.identifier}</div>
      </ListItemIcon>
      <ListItemText
        className="flex-grow"
        primary={style.name}
        secondary={style.category}
      />
    </ListItem>
  );
};
