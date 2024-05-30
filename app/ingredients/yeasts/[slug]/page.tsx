import { YeastDisplay } from "../_components/YeastDisplay";
import { getYeast } from "../queries";
type YeastDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: YeastDisplayPageProps) {
  return Promise.resolve({
    title: `LNK Yeast: ${params.slug}`,
  });
}

export default async function YeastDisplayPage({
  params: { slug },
}: YeastDisplayPageProps) {
  const yeast = await getYeast(slug);
  return <YeastDisplay yeast={yeast} />;
}
