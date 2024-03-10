import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Recipes",
  description: "Recipe Pages",
};

export default function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <h3>Recipes</h3>

      {children}
    </div>
  );
}
