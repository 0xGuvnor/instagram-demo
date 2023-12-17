"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function LoginForm() {
  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={`text-xl dark:text-black`}>Please sign in to continue.</h1>

      <LoginButton />
    </div>
  );
}
export default LoginForm;

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending}
      variant={"secondary"}
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="mt-4 w-full gap-2"
    >
      <FcGoogle size={20} />
      <span>Sign in with Google</span>
    </Button>
  );
}
