"use client";

import { CommentWithExtras } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { RefObject } from "react";
import UserAvatar from "./UserAvatar";
import TimeStamp from "./TimeStamp";
import { Button } from "./ui/button";
import CommentOptions from "./CommentOptions";

interface Props {
  comment: CommentWithExtras;
  inputRef?: RefObject<HTMLInputElement>;
}

function Comment({ comment, inputRef }: Props) {
  const { data: session } = useSession();
  const username = comment.user.username;
  const profileUrl = `/dashboard/${username}`;

  return (
    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
      <Link href={profileUrl}>
        <UserAvatar user={comment.user} />
      </Link>

      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-sm leading-none">
          <Link href={profileUrl} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{comment.body}</p>
        </div>

        <div className="flexx">
          <TimeStamp createdAt={comment.createdAt} />
          <Button
            variant={"ghost"}
            size={"sm"}
            onClick={() => inputRef?.current?.focus()}
            className="mx-2 text-xs font-semibold text-neutral-500"
          >
            Reply
          </Button>
          {comment.userId === session?.user.id && (
            <CommentOptions comment={comment} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Comment;
