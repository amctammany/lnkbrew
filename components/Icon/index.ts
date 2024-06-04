import { AddIcon } from "./AddIcon";
import { UpIcon } from "./UpIcon";
import { DownIcon } from "./DownIcon";
import { CloseIcon } from "./CloseIcon";
import { DeleteIcon } from "./DeleteIcon";
import { SearchIcon } from "./SearchIcon";
import { StarIcon } from "./StarIcon";
import { RedoIcon } from "./RedoIcon";
import { SaveIcon } from "./SaveIcon";
import { UndoIcon } from "./UndoIcon";
import { EditIcon } from "./EditIcon";
import { MinimizeIcon } from "./MinimizeIcon";
import { MaximizeIcon } from "./MaximizeIcon";
import { EquipmentProfileIcon } from "./EquipmentProfileIcon";
import { WaterProfileIcon } from "./WaterProfileIcon";

export const Icons = {
  AddIcon,
  UpIcon,
  EquipmentProfileIcon,
  WaterProfileIcon,
  DownIcon,
  CloseIcon,
  DeleteIcon,
  SearchIcon,
  StarIcon,
  RedoIcon,
  SaveIcon,
  UndoIcon,
  EditIcon,
  MinimizeIcon,
  MaximizeIcon,
};
export type IconNames = keyof typeof Icons;
export default Icons;
