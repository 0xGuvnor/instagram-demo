import Header from "@/components/Header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function HomeLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
export default HomeLayout;
