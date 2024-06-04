import { signIn } from "@/app/auth";

export type SignInProps = {
  redirectTo?: string;
};
export function SignIn({ redirectTo = "/" }: SignInProps) {
  return (
    <div>
      You must be logged in to do this.
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo });
        }}
      >
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
