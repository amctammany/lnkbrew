import { VariantProps, cva } from "class-variance-authority";

const elementStyles = cva("", {
  variants: {
    variant: {
      default: "text-md",
    },
  },
});
export type ElementProps = VariantProps<typeof elementStyles> & {
  children?: React.ReactNode;
};
function Element({ children, ...props }: ElementProps) {
  return <span className={elementStyles(props)}>{children}</span>;
}
export function MgSo4(props: ElementProps) {
  return (
    <Element {...props}>
      MgSO<sub>4</sub>
    </Element>
  );
}
export function Ca2(props: ElementProps) {
  return (
    <Element {...props}>
      Ca<sup>2+</sup>
    </Element>
  );
}
export function Na(props: ElementProps) {
  return (
    <Element {...props}>
      Na<sup>+</sup>
    </Element>
  );
}
export function Cl(props: ElementProps) {
  return (
    <Element {...props}>
      Cl<sup>-</sup>
    </Element>
  );
}
export function SO4(props: ElementProps) {
  return (
    <Element {...props}>
      SO<sub>4</sub>
      <sup>2+</sup>
    </Element>
  );
}
export function HCO3(props: ElementProps) {
  return (
    <Element {...props}>
      HCO<sub>3</sub>
      <sup>2-</sup>
    </Element>
  );
}
