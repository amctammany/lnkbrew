import { redirect } from "next/navigation";
import { MashProfileForm } from "../../_components/MashProfileForm";
import { getMashProfile } from "../../queries";
import Unauthorized from "@/app/admin/_components/Unauthorized";
import { auth } from "@/app/auth";
import { MashProfileInput } from "@/types/Profile";
import { updateMashProfile } from "../../actions";
import { classConverters, UnitTypes } from "@/lib/amountConversions";
import { mapUnits, mashProfileStepMapping } from "@/lib/mapUnits";
type MashProfileEditorPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: MashProfileEditorPageProps) {
  return Promise.resolve({
    title: `LNK MashProfile: ${params.slug}`,
  });
}

export default async function MashProfileEditorPage({
  params: { slug },
}: MashProfileEditorPageProps) {
  const session = await auth();
  if (!session)
    return redirect(`/admin/login?returnUrl=/profiles/mash/${slug}/edit`);

  const mashProfile = await getMashProfile(slug);
  if (mashProfile?.userId !== session?.user?.id)
    return <Unauthorized returnUrl={`/profiles/mash/${slug}`} />;
  const prefs = session.preferences;
  const steps = mashProfile.steps.map((step) =>
    mapUnits(step, prefs, mashProfileStepMapping, "from", 2)
  );
  const mapSteps = (mashProfile.steps ?? []).map(
    ({ name, temperature, time, rampTime }) => ({
      time: classConverters["time"][prefs.time as UnitTypes].to(time), //,(time),
      temperature:
        classConverters["temperature"][prefs.temperature as UnitTypes].to(
          temperature
        ), //,(time),
      rampTime: classConverters["time"][prefs.time as UnitTypes].to(rampTime), //,(time),
      name,
    })
  );
  mashProfile.steps = steps;
  //const mash = { ...mashProfile, steps };
  const action = updateMashProfile.bind(null, session?.preferences);
  return (
    <MashProfileForm
      action={action}
      profile={mashProfile as MashProfileInput}
    />
  );
}
