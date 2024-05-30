import { FermentableEditor } from "../../_components/FermentableEditor";
import { getFermentable } from "../../queries";
import { updateFermentable } from "../../actions";
type FermentableEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: FermentableEditorPageProps) {
  return Promise.resolve({
    title: `LNK Fermentable: ${params.slug}`,
  });
}

export default async function FermentableEditorPage({
  params: { slug },
}: FermentableEditorPageProps) {
  const fermentable = await getFermentable(slug);
  return (
    <FermentableEditor fermentable={fermentable} action={updateFermentable} />
  );
}
