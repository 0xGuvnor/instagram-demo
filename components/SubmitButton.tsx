"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props extends ButtonProps {
  children: ReactNode;
}

function SubmitButton({ children, className, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    >
      {children}
    </button>
  );
}
export default SubmitButton;
