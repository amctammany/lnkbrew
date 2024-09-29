import { auth } from "@/app/auth";
import { MashProfileDisplay } from "../_components/MashProfileDisplay";
import { getMashProfile } from "../queries";
import { UnitPreferences, UserPreferences } from "@prisma/client";
import {
  AmountType,
  classConverters,
  UnitTypes,
} from "@/lib/amountConversions";
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

function mapPrefs<T extends Record<string, unknown>>(
  src: T,
  prefs: Record<keyof Omit<UnitPreferences, "id">, Omit<AmountType, "flow">>,
  mappings: Partial<Record<string, AmountType>>
) {
  return Object.keys(mappings).reduce((acc, key) => {
    const type = mappings[key] as keyof typeof prefs;
    acc[key] = classConverters[type][prefs[type] as UnitTypes].to(acc[key]);
    return acc;
  }, src as any);
}
export default async function MashProfileDisplayPage({
  params: { slug },
}: MashProfileDisplayPageProps) {
  const session = await auth();
  const mashProfile = await getMashProfile(slug);
  const steps = mashProfile.steps.map((step) =>
    mapPrefs(step, session?.preferences ?? ({} as UnitPreferences), {
      temperature: "temperature",
      time: "time",
      rampTime: "time",
    })
  );
  const newMash = { ...mashProfile, steps };

  return <MashProfileDisplay profile={newMash} />;
}
