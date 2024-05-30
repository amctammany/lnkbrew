import { IconButton } from "@/components/Button/IconButton";
import { Toolbar } from "@/components/Toolbar";
import { Fermentable } from "@prisma/client";

export type FermentableEditorProps = {
  fermentable: Fermentable | null;
};
export function FermentableEditor({ fermentable }: FermentableEditorProps) {
  return (
    <div>
      <Toolbar variant="topbar" title={"Editing: " + fermentable?.name}>
        <IconButton iconType="SaveIcon">Save</IconButton>
      </Toolbar>
      <div className="p-4">Fermentable Editor!</div>
    </div>
  );
}

export default FermentableEditor;
