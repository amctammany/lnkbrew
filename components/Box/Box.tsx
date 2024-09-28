import Link from "next/link";
import { IconProps } from "../Icon/Icon";
import { Label } from "../Label";

export type BoxProps = {
  href: string;
  Icon: React.FC<IconProps>;
  children?: React.ReactNode;
};
export const Box = ({ href, children, Icon }: BoxProps) => {
  return (
    <Link
      className="text-center text-2xl bg-slate-500 hover:bg-slate-200 p-3 border border-black flex items-center"
      href={href}
    >
      <Label text={children?.toString()}>
        <Icon size="xl" />
      </Label>
    </Link>
  );
};
