import { Section } from "@/components/Section";
import { IconButtonLink } from "@/components/Button";
import { ExtendedHop } from "@/types/Ingredient";
import { HopIcon } from "@/components/Icon/HopIcon";
import { AddIcon } from "@/components/Icon/AddIcon";
import HopComparePanel from "./HopComparePanel";
import { Hop } from "@prisma/client";

export type HopCompareProps = {
  hops: Hop[];
};
export function HopCompare({ hops }: HopCompareProps) {
  console.log(hops);
  const Row = ({
    prop,
    children,
  }: {
    prop: keyof Hop;
    children?: React.ReactNode;
  }) => {
    return (
      <tr className="border">
        {children ? (
          <th>{children}</th>
        ) : (
          <th className="capitalize">{prop}</th>
        )}
        {hops.map((hop) => (
          <td className="text-center border p-2" key={hop.id}>
            {hop[prop]?.toString()}
          </td>
        ))}
      </tr>
    );
  };
  return (
    <Section
      title="Hop Comparision"
      Icon={HopIcon}
      actions={
        <IconButtonLink href={`/ingredients/hops/`} Icon={AddIcon}>
          Add Hop
        </IconButtonLink>
      }
    >
      <div className="p-4">
        <table className="table-fixed w-full border-collapse">
          <thead>
            <tr>
              <th></th>
              {hops.map((hop) => (
                <th key={hop.id} className="border">
                  {hop.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Row prop="alpha">Alpha Acids (%)</Row>
            <Row prop="beta">Beta Acids (%)</Row>
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export default HopCompare;
