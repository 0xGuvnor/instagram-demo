import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function AuthLayout({ children }: Props) {
  return <div className="grid h-screen place-items-center">{children}</div>;
}
export default AuthLayout;
