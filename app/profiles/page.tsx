import Icon from "@/components/Icon/Icon";
import { WaterProfileIcon } from "@/components/Icon/WaterProfileIcon";
import { Section } from "@/components/Section";
import Link from "next/link";

const links: [string, string, typeof Icon][] = [
  //["Equipment", "/profiles/equipment", EquipmentProfileIcon],
  //["Mash", "/profiles/mash", MashProfileIcon],
  ["Water", "/profiles/water", WaterProfileIcon],
];
export default function ProfilesIndex() {
  return (
    <Section header="Profiles Index">
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {links.map(([label, url, Icon]) => (
          <Link
            key={url}
            href={url}
            className="m-5 p-5 text-center rounded-lg bg-slate-400 border-2 text-black underline uppercase text-lg font-bold inline-flex hover:bg-slate-600 hover:text-white"
          >
            {Icon && <Icon size="default" className="flex-shrink" />}
            <span className="flex-grow">{label}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
