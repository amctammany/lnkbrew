import { ID } from "@/types/App";
import { TrashIcon } from "@heroicons/react/24/solid";

export type RemoveButtonProps = {
  id?: ID;
  action?: any;
};
export const RemoveButton = ({ id, action }: RemoveButtonProps) => {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="border-red-300 border hover:text-red-300  hover:bg-white bg-red-300 text-white rounded-md p-2"
      >
        <TrashIcon className="h-5 w-5 " />
      </button>
    </form>
  );
};
