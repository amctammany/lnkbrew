"use client";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export type UnauthorizedProps = { returnUrl?: string };
export const Unauthorized = ({ returnUrl }: UnauthorizedProps) => {
  const router = useRouter();
  return (
    <div>
      You are not authorized to access this resource.
      <Button onClick={() => router.push(returnUrl ?? "/")}>Go Back</Button>
    </div>
  );
};
export default Unauthorized;
