import { IconButton } from "@/components/Button/IconButton";
import { Toolbar } from "@/components/Toolbar";
import { Hop } from "@prisma/client";

export type HopEditorProps = {
  hop: Hop | null;
};
export function HopEditor({ hop }: HopEditorProps) {
  return (
    <div>
      <Toolbar variant="topbar" title={"Editing: " + hop?.name}>
        <IconButton iconType="SaveIcon">Save</IconButton>
      </Toolbar>
      <div className="p-4">Hop Editor!</div>
    </div>
  );
}

export default HopEditor;
