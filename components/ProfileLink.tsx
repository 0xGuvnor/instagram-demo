"use client";

import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";

interface Props {
  user: User & {
    username?: string | null | undefined;
  };
}

function ProfileLink({ user }: Props) {
  const pathname = usePathname();

  const href = `/dashboard/${user.username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={isActive ? "secondary" : "ghost"}
      size={"lg"}
      className="navLink"
    >
      <Link href={href}>
        <UserAvatar user={user} isActive={isActive} />
        <p className={cn("hidden", "lg:block", isActive && "font-extrabold")}>
          Profile
        </p>
      </Link>
    </Button>
  );
}
export default ProfileLink;
