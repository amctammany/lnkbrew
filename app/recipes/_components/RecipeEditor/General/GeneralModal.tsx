"use client";
import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
//const GeneralForm = dynamic(() => import("./GeneralForm"));

import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/types/Recipe";

interface GeneralProfileModalProps {
  massUnit?: UserMassPreference;
  recipe?: ExtendedRecipe | null;
  modalType?: string;
}

export const GeneralModal: FC<GeneralProfileModalProps> = ({
  recipe,
  massUnit,
  modalType,
}) => {
  //const { modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "general" && (
      <RoutedModal
        title="Edit General"
        returnUrl={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit`}
        //close={closeModal}
        hidden={modalType !== "general"}
      >
        <div>
          {modalType === "general" && (
            <div>General</div>
            //<GeneralForm recipe={recipe} massUnit={massUnit} />
          )}
        </div>
      </RoutedModal>
    )
  );
};
export default GeneralModal;
