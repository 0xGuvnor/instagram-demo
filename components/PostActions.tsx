import { cn } from "@/lib/utils";
import { PostWithExtras } from "@/types";
import LikeButton from "./LikeButton";
import Link from "next/link";
import ShareButton from "./ShareButton";
import BookmarkButton from "./BookmarkButton";
import ActionIcon from "./ActionIcon";
import { MessageCircle } from "lucide-react";

interface Props {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}

function PostActions({ post, userId, className }: Props) {
  return (
    <div className={cn("relative flex w-full items-start gap-x-2", className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className="h-6 w-6" />
        </ActionIcon>
      </Link>
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} />
    </div>
  );
}
export default PostActions;
