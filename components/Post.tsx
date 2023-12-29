import { auth } from "@/auth";
import { PostWithExtras } from "@/types";
import UserAvatar from "./UserAvatar";
import { GoDotFill } from "react-icons/go";
import TimeStamp from "./TimeStamp";
import PostOptions from "./PostOptions";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import PostActions from "./PostActions";
import Link from "next/link";
import Comments from "./Comments";

interface Props {
  post: PostWithExtras;
}

async function Post({ post }: Props) {
  const session = await auth();
  const userId = session?.user.id;
  const username = post.user.username;

  if (!session?.user) return null;
  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <div className="flex items-center space-x-3">
          <UserAvatar user={post.user} />

          <div className="text-sm">
            <p className="flex items-center space-x-1">
              <span className="font-semibold">{username}</span>
              <GoDotFill
                size={6}
                className="shrink-0 text-neutral-500 dark:text-neutral-400"
              />
              <TimeStamp createdAt={post.createdAt} />
            </p>

            <p className="text-xs text-black dark:text-white">Singapore</p>
          </div>
        </div>

        <PostOptions post={post} userId={userId} />
      </div>

      <Card className="relative h-[450px] w-full overflow-hidden rounded-none border-none sm:rounded-md">
        <CardContent>
          <Image
            src={post.fileUrl}
            alt="Post"
            fill
            priority
            className="object-cover sm:rounded-md"
          />
        </CardContent>
      </Card>

      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {post.caption && (
        <div className="flex items-center gap-x-2 px-3 text-sm font-medium leading-none sm:px-0">
          <Link href={`/dashboard/${username}`} className="font-bold">
            {username}
          </Link>
          <p>{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={session.user} />
    </div>
  );
}
export default Post;
