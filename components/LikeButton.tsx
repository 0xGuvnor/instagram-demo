"use client";

import { PostWithExtras } from "@/types";
import { Like } from "@prisma/client";
import { useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { likePost } from "@/lib/actions";

interface Props {
  post: PostWithExtras;
  userId?: string;
}

function LikeButton({ post, userId }: Props) {
  const predicate = (like: Like) =>
    like.userId === userId && like.postId === post.id;
  const [optimisticLikes, addOptimisticLike] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(predicate)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike],
  );

  const handleLike = async (formData: FormData) => {
    const postId = formData.get("postId");
    addOptimisticLike({ postId, userId });

    await likePost(postId);
  };

  return (
    <div className="flex flex-col">
      <form action={handleLike}>
        <input type="hidden" name="postId" value={post.id} />
        <ActionIcon>
          <Heart
            className={cn(
              "h-6 w-6",
              optimisticLikes.some(predicate) && "fill-red-500 text-red-500",
            )}
          />
        </ActionIcon>
      </form>

      {optimisticLikes.length > 0 && (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      )}
    </div>
  );
}
export default LikeButton;
