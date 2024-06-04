import { SignIn } from "@/components/Button/SignInButton";
//import { auth } from "@/app/auth";
export type LoginPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function LoginPage({ searchParams }: LoginPageProps) {
  return <SignIn redirectTo={searchParams.returnUrl?.toString()} />;
}
