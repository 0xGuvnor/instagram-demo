import { ReactNode } from "react";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  children: ReactNode;
}
function ActionIcon({ children, ...buttonProps }: Props) {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      {...buttonProps}
      className="h-9 w-9"
    >
      {children}
    </Button>
  );
}
export default ActionIcon;
