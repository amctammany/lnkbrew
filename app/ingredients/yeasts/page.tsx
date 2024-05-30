import { YeastsTable } from "./_components/YeastsTable";
import { getYeasts } from "./queries";

export default async function YeastsIndex() {
  const yeasts = await getYeasts();
  return <YeastsTable yeasts={yeasts} />;
}
