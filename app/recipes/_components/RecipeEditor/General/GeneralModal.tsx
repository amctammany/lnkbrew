"use client";
//import { RoutedModal } from "@/components/Modal/RoutedModal";
import React, { FC, useCallback } from "react";
import dynamic from "next/dynamic";
const GeneralForm = dynamic(() => import("./GeneralForm"), { ssr: true });

import { UserMassPreference } from "@prisma/client";
import { ExtendedRecipe } from "@/types/Recipe";
import { Modal } from "@/components/Modal/Modal";

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
  //const u = useRouter();
  const closeModal = useCallback(
    () =>
      //u.push(`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit`),
      console.log(recipe),
    [recipe]
  );

  return (
    modalType === "general" && (
      <Modal
        title="Edit General"
        //returnUrl={`/recipes/${recipe?.ownerUsername}/${recipe?.slug}/edit`}
        close={closeModal}
        hidden={modalType !== "general"}
      >
        <div>
          {modalType === "general" && (
            <>
              <GeneralForm recipe={recipe} />
            </>
          )}
        </div>
      </Modal>
    )
  );
};
export default GeneralModal;
