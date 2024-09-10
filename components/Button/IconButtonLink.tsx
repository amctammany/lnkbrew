import { LinkProps } from "next/link";
import { IconButton, IconButtonProps } from "./IconButton";
import Link from "next/link";

export type IconButtonLinkProps = IconButtonProps & {
  scroll?: boolean;
  href: LinkProps["href"];
};
export const IconButtonLink = ({
  href,
  scroll,
  ...props
}: IconButtonLinkProps) => {
  return (
    <Link prefetch={false} href={href} scroll={scroll}>
      <IconButton {...props} />
    </Link>
  );
};
