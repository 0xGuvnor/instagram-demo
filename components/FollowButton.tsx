"use client";

import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { buttonVariants } from "./ui/button";
import { followUser } from "@/lib/actions";
import { useOptimistic } from "react";
import { toast } from "sonner";

interface Props {
  isFollowing: boolean;
  profileId: string;
  className?: string;
  buttonClassName?: string;
}

function FollowButton({
  isFollowing,
  profileId,
  buttonClassName,
  className,
}: Props) {
  const [optimisticIsFollowing, addOptimisticFollowToggle] =
    useOptimistic<boolean>(
      isFollowing,
      // @ts-ignore
      (state: boolean, newFollowToggle: boolean) => newFollowToggle,
    );

  const handleFollow = async (formData: FormData) => {
    addOptimisticFollowToggle(!isFollowing);

    const { message } = await followUser(formData);
    toast(message);
  };

  return (
    <form action={handleFollow} className={className}>
      <input type="hidden" name="id" value={profileId} />
      <SubmitButton
        className={buttonVariants({
          variant: optimisticIsFollowing ? "secondary" : "default",
          size: "sm",
          className: cn("w-full font-bold", buttonClassName),
        })}
      >
        {optimisticIsFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}
export default FollowButton;
