import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LNK Ingredients",
  description: "Ingredient Pages",
};

export default function IngredientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <h3>Ingredients</h3>

      {children}
    </div>
  );
}
