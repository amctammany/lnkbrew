import { ID } from "@/types/App";
import { IconButton } from "../Button";
import { DeleteIcon } from "../Icon/DeleteIcon";

export type RemoveButtonProps = {
  id?: ID;
  action?: any;
  text?: string;
};
export const RemoveButton = ({
  id,
  action,
  text = "Remove",
}: RemoveButtonProps) => {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <IconButton
        Icon={DeleteIcon}
        type="submit"
        className="border-red-300 border hover:text-red-300  hover:bg-white bg-red-300 text-white rounded-md p-2"
      >
        {text}
      </IconButton>
    </form>
  );
};
