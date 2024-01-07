"use client";

import useMount from "@/hooks/useMount";
import { FollowerWithExtras } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import Follower from "./Follower";

interface Props {
  followers: FollowerWithExtras[] | undefined;
  username: string;
}

function FollowersModal({ followers, username }: Props) {
  const isMounted = useMount();
  const pathname = usePathname();
  const router = useRouter();
  const isFollowersPage = pathname === `/dashboard/${username}/followers`;

  if (!isMounted) return null;
  return (
    <Dialog
      open={isFollowersPage}
      onOpenChange={(open) => !open && router.back()}
    >
      <DialogContent className="dialogContent">
        <DialogHeader className="w-full border-b border-zinc-300 py-2 dark:border-neutral-700">
          <DialogTitle className="mx-auto font-bold">Followers</DialogTitle>
        </DialogHeader>

        {followers?.length === 0 && (
          <p className="p-4 text-sm font-medium">This user has no followers.</p>
        )}

        <ScrollArea className="max-h-[350px] min-h-fit">
          {followers?.map((follower) => (
            <Follower key={follower.followerId} follower={follower} />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
export default FollowersModal;
