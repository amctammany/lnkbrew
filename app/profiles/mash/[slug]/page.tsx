import { MashProfileDisplay } from "../_components/MashProfileDisplay";
import { getMashProfile } from "../queries";
type MashProfileDisplayPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: MashProfileDisplayPageProps) {
  return Promise.resolve({
    title: `LNK MashProfile: ${params.slug}`,
  });
}

export default async function MashProfileDisplayPage({
  params: { slug },
}: MashProfileDisplayPageProps) {
  const mashProfile = await getMashProfile(slug);
  return <MashProfileDisplay profile={mashProfile} />;
}
