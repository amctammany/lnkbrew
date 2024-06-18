import clsx from "clsx";
import { AmountType } from "../Prop/amountConversions";
import { InputProps } from "./Input";
import { Label } from "./Label";

export type AmountField1Props = {
  amountType?: AmountType;
} & InputProps;
export const AmountField1 = ({ className, label, name }: AmountField1Props) => {
  return (
    <Label className={clsx("", className)} label={label || name}>
      Amotn
    </Label>
  );
};
