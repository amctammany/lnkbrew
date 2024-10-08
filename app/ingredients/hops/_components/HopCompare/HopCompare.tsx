import { Section } from "@/components/Section";
import { IconButtonLink } from "@/components/Button";
import { HopIcon } from "@/components/Icon/HopIcon";
import { AddIcon } from "@/components/Icon/AddIcon";
import { Hop } from "@prisma/client";
import { CloseIcon } from "@/components/Icon/CloseIcon";

export type HopCompareProps = {
  hops: Hop[];
};
export function HopCompare({ hops }: HopCompareProps) {
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
          <td className="text-center border p-2 pr-8" key={hop.id}>
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
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th></th>
              {hops.map((hop) => (
                <th key={hop.id} className="border">
                  <div className="flex">
                    <span className="my-auto pl-8 h-full flex-grow">
                      {hop.name}
                    </span>
                    <IconButtonLink
                      //className="float-right"
                      href={`/ingredients/hops/compare?${new URLSearchParams(hops.filter((h) => h.id !== hop.id).map((h) => ["hop", h.slug]))}`}
                      Icon={CloseIcon}
                    ></IconButtonLink>
                  </div>
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
