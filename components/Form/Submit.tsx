import Button, { ButtonProps } from "../Button/Button";

export type SubmitProps = Omit<ButtonProps, "type">;

export const Submit = ({ children, variant, size }: SubmitProps) => {
  return (
    <Button type="submit" {...{ variant, size }}>
      {children}
    </Button>
  );
};
