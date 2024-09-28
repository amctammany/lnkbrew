import { FermentablesTable } from "./_components/FermentablesTable";
import { getFermentables } from "./queries";

//export const experimental_ppr = false;
export default async function FermentablesIndex() {
  const fermentables = await getFermentables();
  return <FermentablesTable fermentables={fermentables} />;
}
