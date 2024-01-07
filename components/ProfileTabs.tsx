"use client";

import { UserWithExtras } from "@/types";
import { Bookmark, Clapperboard, Contact, Grid3x3 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "./ui/separator";

interface Props {
  profile: UserWithExtras;
  isCurrentUser: boolean;
}

function ProfileTabs({ profile, isCurrentUser }: Props) {
  const pathname = usePathname();

  return (
    <Tabs defaultValue="" className="pb-16 pt-14 md:pt-32">
      <TabsList className="h-px w-full gap-x-10 bg-zinc-300 p-0 dark:bg-neutral-800">
        {profileTabs
          .filter((tab) => isCurrentUser || tab.href !== "saved")
          .map((tab) => {
            const profilePage = `/dashboard/${profile.username}`;
            const isActive = tab.href
              ? pathname === `${profilePage}/${tab.href}`
              : pathname === profilePage;

            return (
              <TabsTrigger
                key={tab.href}
                value={tab.href}
                asChild
                className={cn(
                  "flex-col gap-4 self-start p-0",
                  isActive
                    ? "text-neutral-700 dark:text-white"
                    : "text-neutral-400",
                )}
              >
                <Link href={`/dashboard/${profile.username}/${tab.href}`}>
                  <Separator
                    className={cn(
                      "h-px w-16",
                      isActive
                        ? "bg-neutral-700 dark:bg-white"
                        : "bg-zinc-300 dark:bg-neutral-800",
                    )}
                  />
                  <div className="flex items-center gap-x-1">
                    <tab.Icon className="size-3" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {tab.title}
                    </p>
                  </div>
                </Link>
              </TabsTrigger>
            );
          })}
      </TabsList>
    </Tabs>
  );
}
export default ProfileTabs;

const profileTabs = [
  { title: "Posts", href: "", Icon: Grid3x3 },
  { title: "Reels", href: "reels", Icon: Clapperboard },
  { title: "Saved", href: "saved", Icon: Bookmark },
  { title: "Tagged", href: "tagged", Icon: Contact },
];
