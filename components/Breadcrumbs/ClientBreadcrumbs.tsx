"use client";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

export default function ClientBreadcrumbs(props: BreadcrumbsProps) {
  const url = usePathname();
  return <span>{url}</span>;
  return <Breadcrumbs link={url} {...props} />;
}
