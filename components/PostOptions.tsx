"use client";

import { PostWithExtras } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import { toast } from "sonner";
import { deletePost } from "@/lib/actions";

interface Props {
  post: PostWithExtras;
  userId?: string;
  className?: string | undefined;
}

function PostOptions({ post, userId, className }: Props) {
  const isPostMine = post.userId === userId;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 cursor-pointer dark:text-neutral-400",
            className,
          )}
        />
      </DialogTrigger>

      <DialogContent className="dialogContent">
        {isPostMine && (
          <>
            <form
              action={async (formData) => {
                const { message } = await deletePost(formData);
                toast(message);
              }}
              className="postOption"
            >
              <input type="hidden" name="id" value={post.id} />
              <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
                Delete post
              </SubmitButton>
            </form>

            <Link
              href={`/dashboard/${post.id}/edit`}
              scroll={false}
              className="postOption p-3"
            >
              Edit
            </Link>
          </>
        )}

        <form action={""} className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default PostOptions;
