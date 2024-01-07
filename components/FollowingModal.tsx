"use client";

import { FollowingWithExtras } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import useMount from "@/hooks/useMount";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import Following from "./Following";

interface Props {
  following: FollowingWithExtras[] | undefined;
  username: string;
}

function FollowingModal({ following, username }: Props) {
  const isMounted = useMount();
  const pathname = usePathname();
  const router = useRouter();
  const isFollowingPage = pathname === `/dashboard/${username}/following`;

  if (!isMounted) return null;
  return (
    <Dialog
      open={isFollowingPage}
      onOpenChange={(open) => !open && router.back()}
    >
      <DialogContent className="dialogContent">
        <DialogHeader className="w-full border-b border-zinc-300 py-2 dark:border-neutral-700">
          <DialogTitle className="mx-auto font-bold">Following</DialogTitle>
        </DialogHeader>

        {following?.length === 0 && (
          <p className="p-4 text-sm font-medium">This user has no following.</p>
        )}

        <ScrollArea className="max-h-[350px] min-h-fit">
          {following?.map((following) => (
            <Following key={following.followingId} following={following} />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
export default FollowingModal;
