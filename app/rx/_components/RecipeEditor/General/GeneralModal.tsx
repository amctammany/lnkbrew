"use client";
//import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC, useCallback } from "react";
import dynamic from "next/dynamic";
//const GeneralForm = dynamic(() => import("./GeneralForm"), { ssr: false });

import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/types/Recipe";
import { Modal } from "@/components/Modal/Modal";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import GeneralForm, { GeneralFormContainer } from "./GeneralForm";
import { getRecipeUrl } from "@/lib/utils";
import { updateRecipeGeneral } from "@/app/rx/actions";

interface GeneralProfileModalProps {
  massUnit?: UserMassPreference;
  recipe: ExtendedRecipe;
  modalType?: string;
}

export const GeneralModal: FC<GeneralProfileModalProps> = ({
  recipe,
  massUnit,
  modalType,
}) => {
  //const { modalType, openModal, closeModal } = useRecipe();
  return (
    //modalType === "general" && (
    <GeneralFormContainer>
      <RoutedModal
        title="Edit General"
        returnUrl={getRecipeUrl(recipe.id)}
        //close={closeModal}
        hidden={modalType !== "general"}
      >
        <GeneralForm action={updateRecipeGeneral} recipe={recipe} />
      </RoutedModal>
    </GeneralFormContainer>
    //)
  );
};
export default GeneralModal;
