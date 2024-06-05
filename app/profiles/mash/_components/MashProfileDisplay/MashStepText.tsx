import { MashStep } from "@prisma/client";
import React from "react";

type MashStepTextProps = {
  step: MashStep;
};
export function MashStepText({ step }: MashStepTextProps) {
  return (
    <span className="capitalize">
      {step.type} - {step.time} min @ {step.temperature}
    </span>
  );
}
