"use client";

import { PostWithExtras } from "@/types";
import { SavedPost } from "@prisma/client";
import { useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { bookmarkPost } from "@/lib/actions";

interface Props {
  post: PostWithExtras;
  userId?: string;
}

function BookmarkButton({ post, userId }: Props) {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.some(predicate)
        ? state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark],
  );

  const handleBookmark = async (formData: FormData) => {
    const postId = formData.get("postId");
    addOptimisticBookmark({ postId, userId });

    await bookmarkPost(postId);
  };

  return (
    <form action={handleBookmark} className="ml-auto">
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
        <Bookmark
          className={cn(
            "h-6 w-6",
            optimisticBookmarks.some(predicate) && "fill-black dark:fill-white",
          )}
        />
      </ActionIcon>
    </form>
  );
}
export default BookmarkButton;
