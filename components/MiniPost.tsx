"use client";

import { PostWithExtras } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import TimeStamp from "./TimeStamp";
import PostOptions from "./PostOptions";

interface Props {
  post: PostWithExtras;
}

function MiniPost({ post }: Props) {
  const username = post.user.username;
  const profileUrl = `/dashboard/${username}`;
  const { data: session, status } = useSession();
  const user = session?.user;

  if (!user) return null;
  return (
    <div className="group flex items-start space-x-2.5 p-3 px-3.5">
      <Link href={profileUrl}>
        <UserAvatar user={post.user} />
      </Link>

      <div className="space-y-1.5">
        <div className="flex items-start space-x-1.5 text-sm leading-none">
          <Link href={profileUrl} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium">{post.caption}</p>
        </div>

        <div className="flex h-5 items-center space-x-2.5">
          <TimeStamp createdAt={post.createdAt} />
          <PostOptions
            post={post}
            userId={user.id}
            className="hidden group-hover:inline"
          />
        </div>
      </div>
    </div>
  );
}
export default MiniPost;
