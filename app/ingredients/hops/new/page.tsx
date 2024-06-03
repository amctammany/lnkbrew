import { HopEditor } from "../_components/HopEditor";
import { createHop } from "../actions";
//import { getHop } from "../../queries";
import { Hop } from "@prisma/client";
type HopCreatorPageProps = {};

export async function generateMetadata({}: HopCreatorPageProps) {
  return Promise.resolve({
    title: `LNK Hop Creator`,
  });
}

export default async function HopCreatorPage({}: HopCreatorPageProps) {
  const hop = {} as Hop;
  return <HopEditor hop={hop} action={createHop} />;
}
