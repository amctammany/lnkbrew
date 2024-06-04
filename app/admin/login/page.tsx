import { SignIn } from "@/components/Button/SignInButton";
//const AdminModal = dynamic(
//() => import("./AdminModal").then((s) => s.AdminModal),
//{ ssr: false }
//);

//import { auth } from "@/app/auth";
export type LoginPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function LoginPage({ searchParams }: LoginPageProps) {
  console.log(searchParams);
  return <SignIn redirectTo={searchParams.returnUrl?.toString()} />;
}
