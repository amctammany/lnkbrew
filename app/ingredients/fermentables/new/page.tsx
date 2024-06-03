import { FermentableEditor } from "../_components/FermentableEditor";
import { createFermentable } from "../actions";
//import { getFermentable } from "../../queries";
import { Fermentable } from "@prisma/client";
type FermentableCreatorPageProps = {};

export async function generateMetadata({}: FermentableCreatorPageProps) {
  return Promise.resolve({
    title: `LNK Fermentable Creator`,
  });
}

export default async function FermentableCreatorPage({}: FermentableCreatorPageProps) {
  const fermentable = {} as Fermentable;
  return (
    <FermentableEditor fermentable={fermentable} action={createFermentable} />
  );
}
