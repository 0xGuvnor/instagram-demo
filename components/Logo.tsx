import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Button
      asChild
      variant={"ghost"}
      size={"lg"}
      className={cn(
        "navLink",
        "mb-10 hidden !p-0 md:flex md:hover:bg-transparent",
      )}
    >
      <Link href={"/dashboard"}>
        <Image src={"/logo.svg"} alt="Logo" width={100} height={100} />
        <p className={`font-pixel hidden text-xl font-semibold lg:block`}>
          Instasnaps
        </p>
      </Link>
    </Button>
  );
}
export default Logo;
