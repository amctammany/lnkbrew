import { SignIn } from "@/components/Button/SignInButton";
import { redirect } from "next/navigation";
//import { auth } from "@/app/auth";
export type LoginPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function LoginPage({ searchParams }: LoginPageProps) {
  return redirect(
    `/api/auth/signin?callbackUrl=${(searchParams.returnUrl ?? "/admin/dash").toString()}`
  );
  //return <SignIn redirectTo={searchParams.returnUrl?.toString()} />;
}
