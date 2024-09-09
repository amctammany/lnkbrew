import { HopCompare } from "../_components/HopCompare";
import { getHops } from "../queries";
type HopComparePageProps = {
  searchParams: { hop: string | string[] };
};

export async function generateMetadata({}: HopComparePageProps) {
  return Promise.resolve({
    title: `LNK Hop Comparision`,
  });
}

export default async function HopComparePage({
  searchParams: { hop },
}: HopComparePageProps) {
  const hopIds = Array.isArray(hop) ? hop.map((id) => id) : [hop];
  const hops = await getHops({ where: { slug: { in: hopIds } } });

  return <HopCompare hops={hops} />;
}
