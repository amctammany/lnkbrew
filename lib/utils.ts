import { ExtendedRecipe } from "@/types/Recipe";
import { memo } from "react";
export const genericMemo: <
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
>(
  component: T,
  propsAreEqual?: (
    prevProps: React.ComponentProps<T>,
    nextProps: React.ComponentProps<T>
  ) => boolean
) => T & { displayName?: string } = memo;

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
export function getRecipeUrl(recipe: ExtendedRecipe, edit = false) {
  return `/recipes/${recipe.ownerUsername}/${recipe.slug}/${edit ? "edit" : ""}`;
}
