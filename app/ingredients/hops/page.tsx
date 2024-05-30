import { Hop } from "@prisma/client";
import { HopsTable } from "./_components/HopsTable";
import { getHops } from "./queries";
import { Direction } from "@/components/Table/types";

type HopsIndexProps = {
  searchParams: {
    sort?: keyof Hop;
    direction?: Direction;
  };
};
export default async function HopsIndex({
  searchParams: { sort, direction },
}: HopsIndexProps) {
  const hops = await getHops();
  return <HopsTable hops={hops} sort={sort} direction={direction} />;
}
