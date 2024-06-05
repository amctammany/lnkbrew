//import { AppIcon } from "@/components/AppIcon";
import { ListItem } from "@/components/List/ListItem";
//import { ListItemActions } from "@/components/List/ListItemActions";
import { ListItemIcon } from "@/components/List/ListItemIcon";
import { ListItemText } from "@/components/List/ListItemText";
//import { InlineProp } from "@/components/Prop/InlineProp";
//import { Prop } from "@/components/Prop";
import { MashStep } from "@prisma/client";
import React from "react";
import { MashStepText } from "./MashStepText";

export type MashStepListItemProps = {
  step: MashStep;
  index: number;
};
export function MashStepListItem({ step, index }: MashStepListItemProps) {
  return (
    <ListItem border="none" key={step.id}>
      <ListItemIcon className="w-14">
        <b>{index}</b>
      </ListItemIcon>
      <ListItemText
        primary={<MashStepText step={step} />}
        secondary={
          <>
            <b className="px-2">Ramp Time:</b>
            <span>{step.rampTime} min</span>
          </>
        }
      />
    </ListItem>
  );
}
