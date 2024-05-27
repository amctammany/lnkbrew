import { HopEditor } from "../../_components/HopEditor";
import { getHop } from "../../queries";
type HopEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: HopEditorPageProps) {
  return Promise.resolve({
    title: `LNK Hop: ${params.slug}`,
  });
}

export default async function HopEditorPage({
  params: { slug },
}: HopEditorPageProps) {
  const hop = await getHop(slug);
  return <HopEditor hop={hop} />;
}
