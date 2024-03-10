import { LinkProps } from "next/link";
import Button, { ButtonProps } from "./Button";
import Link from "next/link";

export type ButtonLinkProps = ButtonProps & {
  scroll?: boolean;
  href: LinkProps["href"];
};
export const ButtonLink = ({ href, scroll, ...props }: ButtonLinkProps) => {
  return (
    <Link href={href} scroll={scroll}>
      <Button {...props} />
    </Link>
  );
};
