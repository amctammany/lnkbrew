import { signIn } from "@/app/auth";
import Button from "./Button";

export type SignInProps = {
  redirectTo?: string;
};
export function SignIn({ redirectTo = "/" }: SignInProps) {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo });
        }}
      >
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}
