import { HopDisplay } from "../_components/HopDisplay";
import { getHop } from "../queries";
type HopDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: HopDisplayPageProps) {
  return Promise.resolve({
    title: `LNK Hop: ${params.slug}`,
  });
}

export default async function HopDisplayPage({
  params: { slug },
}: HopDisplayPageProps) {
  const hop = await getHop(slug);
  return <HopDisplay hop={hop} />;
}
