import { YeastEditor } from "../../_components/YeastEditor";
import { getYeast } from "../../queries";
import { updateYeast } from "../../actions";
type YeastEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: YeastEditorPageProps) {
  return Promise.resolve({
    title: `LNK Yeast: ${params.slug}`,
  });
}

export default async function YeastEditorPage({
  params: { slug },
}: YeastEditorPageProps) {
  const yeast = await getYeast(slug);
  return <YeastEditor yeast={yeast} action={updateYeast} />;
}
