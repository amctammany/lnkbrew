import { FermentablesTable } from "./_components/FermentablesTable";
import { getFermentables } from "./queries";

export default async function FermentablesIndex() {
  const fermentables = await getFermentables();
  return <FermentablesTable fermentables={fermentables} />;
}
