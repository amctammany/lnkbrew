import Link from "next/link";
import { IconProps } from "../Icon/Icon";

export type BoxProps = {
  href: string;
  Icon: React.FC<IconProps>;
  children?: React.ReactNode;
};
export const Box = ({ href, children, Icon }: BoxProps) => {
  return (
    <Link
      className="text-center text-2xl bg-slate-500 hover:bg-slate-200 p-8 border border-black flex"
      href={href}
    >
      <Icon size="xl" />
      <div className="flex-grow hidden sm:grid">
        <span className="m-auto text-lg md:text-2xl lg:text-4xl">
          {children}
        </span>
      </div>
    </Link>
  );
};
