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

interface StyleProfileModalProps {
  massUnit?: UserMassPreference;
  recipe?: ExtendedRecipe | null;
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
    <StyleFormContainer>
      <RoutedModal
        title="Edit Style"
        returnUrl={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit`}
        //close={closeModal}
        hidden={modalType !== "style"}
      >
        <div>
          <StyleForm recipe={recipe} styles={styles} />
        </div>
      </RoutedModal>
    </StyleFormContainer>
    //)
  );
};
export default StyleModal;
