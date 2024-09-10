"use client";
//import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC, useCallback } from "react";
import dynamic from "next/dynamic";
const StyleForm = dynamic(() => import("./StyleForm"), { ssr: true });

import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/types/Recipe";
import { Modal } from "@/components/Modal/Modal";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import { StyleFormContainer } from "./StyleForm";

interface StyleProfileModalProps {
  massUnit?: UserMassPreference;
  recipe?: ExtendedRecipe | null;
  modalType?: string;
}

export const StyleModal: FC<StyleProfileModalProps> = ({
  recipe,
  massUnit,
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
          {modalType === "style" && (
            <>
              <StyleForm recipe={recipe} />
            </>
          )}
        </div>
      </RoutedModal>
    </StyleFormContainer>
    //)
  );
};
export default StyleModal;
