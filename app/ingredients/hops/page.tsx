import { HopsTable, MemoHopsTable } from "./_components/HopsTable";
import { getHops } from "./queries";

export default async function HopsIndex() {
  const hops = await getHops();
  return <MemoHopsTable hops={hops} />;
}
