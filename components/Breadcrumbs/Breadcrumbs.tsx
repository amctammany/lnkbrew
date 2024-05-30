//import clsx from "clsx";

import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import Link from "next/link";
import { ComponentProps } from "react";

type BreadcrumbLinkProps = {
  href: string;
  text: string;
};
const dividerStyles = cva("px-4", {
  variants: {
    variant: {
      default: "",
      hidden: "hidden",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
type DividerProps = VariantProps<typeof dividerStyles> & { hidden?: boolean };
const Divider = ({ hidden }: DividerProps) => (
  <span className={dividerStyles({ variant: hidden ? "hidden" : "default" })}>
    /
  </span>
);
const BreadcrumbLink = ({ href, text }: BreadcrumbLinkProps) => (
  <Link className="font-bold  capitalize" href={href}>
    {text}
  </Link>
);
export type BreadcrumbsProps = VariantProps<typeof breadcrumbsStyles> &
  ComponentProps<"div"> & {
    link?: string;
  };
const breadcrumbsStyles = cva(["flex mx-8"], {
  variants: {
    variant: {
      default: [""],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
export const Breadcrumbs = ({ link, className, variant }: BreadcrumbsProps) => {
  const crumbs = link
    ?.split("/")
    .reduce(
      (acc, c) => {
        const crumb = { href: acc.prefix + "/" + c, text: c };
        return c === ""
          ? acc
          : {
              seq: [...acc.seq, crumb],
              prefix: acc.prefix + c,
            };
      },
      { seq: [], prefix: "/" } as {
        seq: { href: string; text: string }[];
        prefix: string;
      }
    )
    .seq.map(({ href, text }) => (
      <BreadcrumbLink key={href} href={href} text={text} />
    ));
  const breadcrumbs = Array.from({ length: (crumbs?.length ?? 0) * 2 })
    .slice(1)
    .map((_, i) =>
      i % 2 === 0 ? crumbs?.[Math.floor((i - 0) / 2)] : <Divider key={i} />
    );
  return (
    <div className={clsx(className, breadcrumbsStyles({ variant }))}>
      <div className="font-extrabold">LNK</div>
      <Divider hidden={breadcrumbs.length < 2} />
      {breadcrumbs}
    </div>
  );
};
