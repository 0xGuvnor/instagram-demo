"use client";

import { PostWithExtras } from "@/types";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import useMount from "@/hooks/useMount";
import { ScrollArea } from "./ui/scroll-area";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import ViewPost from "./ViewPost";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import Image from "next/image";

interface Props {
  id: string;
  post: PostWithExtras;
}

function PostView({ id, post }: Props) {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = post.user.username;
  const profileUrl = `/dashboard/${username}`;
  const isMounted = useMount();

  if (!isMounted) return null;
  return (
    <Dialog open={isPostModal} onOpenChange={(open) => !open && router.back()}>
      <DialogContent className="flex h-full max-h-[500px] flex-col items-start gap-0 p-0 md:max-w-3xl md:flex-row lg:max-h-[700px] lg:max-w-5xl xl:max-h-[800px] xl:max-w-6xl">
        <div className="flex w-full max-w-md flex-col justify-between md:order-2 md:h-full">
          <DialogHeader className="flex flex-row items-center space-x-2.5 space-y-0 border-b py-4 pl-3.5 pr-6">
            <Link href={profileUrl}>
              <UserAvatar user={post.user} />
            </Link>
            <Link href={profileUrl} className="text-sm font-semibold">
              {username}
            </Link>
          </DialogHeader>

          <ScrollArea className="hidden flex-1 border-b py-1.5 md:inline">
            <MiniPost post={post} />
            {post.comments.length > 0 && (
              <>
                {post.comments.map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      inputRef={inputRef}
                    />
                  );
                })}
              </>
            )}
          </ScrollArea>

          <ViewPost className="hidden border-b md:flex" />

          <div className="mt-auto hidden border-b p-2.5 px-2 md:block">
            <PostActions post={post} userId={user?.id} />
            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm
            postId={id}
            inputRef={inputRef}
            className="hidden md:inline-flex"
          />
        </div>

        <div className="relative h-96 w-full max-w-3xl overflow-hidden md:h-[500px] md:rounded-l-md lg:h-[700px] xl:h-[800px]">
          <Image
            src={post.fileUrl}
            alt={post.caption || "No post caption."}
            fill
            className="object-cover"
          />
        </div>

        <PostActions
          post={post}
          userId={user?.id}
          className="border-b p-2.5 md:hidden"
        />
        <CommentForm postId={id} inputRef={inputRef} className="md:hidden" />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
}
export default PostView;
