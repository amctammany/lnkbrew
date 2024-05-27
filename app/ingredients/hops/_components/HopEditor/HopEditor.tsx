import { Hop } from "@prisma/client";

export type HopEditorProps = {
  hop: Hop | null;
};
export function HopEditor({ hop }: HopEditorProps) {
  return <div>HopEditor {hop?.name}</div>;
}

export default HopEditor;
