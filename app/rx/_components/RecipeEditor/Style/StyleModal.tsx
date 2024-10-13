"use client";
//import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC, useCallback } from "react";
import dynamic from "next/dynamic";
//const StyleForm = dynamic(() => import("./StyleForm"), { ssr: false });

import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/types/Recipe";
import { Modal } from "@/components/Modal/Modal";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import StyleForm, { StyleFormContainer } from "./StyleForm";
import { getRecipeUrl } from "@/lib/utils";
import { updateRecipeStyle } from "@/app/rx/actions";

interface StyleProfileModalProps {
  massUnit?: UserMassPreference;
  recipe: ExtendedRecipe;
  modalType?: string;
  styles?: any;
}

export const StyleModal: FC<StyleProfileModalProps> = ({
  recipe,
  massUnit,
  styles,
  modalType,
}) => {
  //const { modalType, openModal, closeModal } = useRecipe();
  return (
    //modalType === "style" && (
    <RoutedModal
      title="Edit Style"
      returnUrl={getRecipeUrl(recipe.id)}
      //close={closeModal}
      hidden={modalType !== "style"}
    >
      <div>
        <StyleForm action={updateRecipeStyle} recipe={recipe} styles={styles} />
      </div>
    </RoutedModal>
    //)
  );
};
export default StyleModal;
