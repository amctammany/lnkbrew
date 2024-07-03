import { auth } from "@/app/auth";
import { MashProfileDisplay } from "../_components/MashProfileDisplay";
import { getMashProfile } from "../queries";
import { toggleUserFavorite } from "@/app/admin/actions";
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
  const session = await auth();

  return (
    <MashProfileDisplay
      profile={mashProfile}
      preferences={session?.user?.UserPreferences}
      action={toggleUserFavorite}
    />
  );
}
