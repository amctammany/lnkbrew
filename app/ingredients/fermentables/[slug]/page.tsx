import { FermentableDisplay } from "../_components/FermentableDisplay";
import { getFermentable } from "../queries";
type FermentableDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: FermentableDisplayPageProps) {
  return Promise.resolve({
    title: `LNK Fermentable: ${params.slug}`,
  });
}

export default async function FermentableDisplayPage({
  params: { slug },
}: FermentableDisplayPageProps) {
  const fermentable = await getFermentable(slug);
  return <FermentableDisplay fermentable={fermentable} />;
}
