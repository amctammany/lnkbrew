import { YeastEditor } from "../_components/YeastEditor";
import { createYeast } from "../actions";
//import { getYeast } from "../../queries";
import { Yeast } from "@prisma/client";
type YeastCreatorPageProps = {};

export async function generateMetadata({}: YeastCreatorPageProps) {
  return Promise.resolve({
    title: `LNK Yeast Creator`,
  });
}

export default async function YeastCreatorPage({}: YeastCreatorPageProps) {
  const yeast = {} as Yeast;
  return <YeastEditor yeast={yeast} action={createYeast} />;
}
