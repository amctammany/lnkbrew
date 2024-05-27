import { HopsTable } from "./_components/HopsTable";
import { getHops } from "./queries";

export default async function HopsIndex() {
  const hops = await getHops();
  return <HopsTable hops={hops} />;
}
