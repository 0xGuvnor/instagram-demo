import { auth } from "@/auth";
import { fetchPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Card } from "./ui/card";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import PostOptions from "./PostOptions";
import { ScrollArea } from "./ui/scroll-area";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import Post from "./Post";

interface Props {
  id: string;
}

async function SinglePost({ id }: Props) {
  const post = await fetchPostById(id);
  const session = await auth();
  const postUsername = post?.user.username;
  const userId = session?.user.id;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Card className="mx-auto hidden h-[500px] max-w-3xl md:flex lg:max-w-4xl">
        <div className="relative h-[500px] w-full max-w-sm overflow-hidden lg:max-w-lg">
          <Image
            src={post.fileUrl}
            alt="Post preview"
            fill
            className="object-cover md:rounded-l-md"
          />
        </div>

        <div className="flex max-w-sm flex-1 flex-col">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  asChild
                  size={"sm"}
                  variant={"ghost"}
                  className="text-sm font-semibold"
                >
                  <Link href={`/dashboard/${postUsername}`}>
                    {postUsername}
                  </Link>
                </Button>
              </HoverCardTrigger>

              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <UserAvatar user={post.user} className="size-14" />
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>

            <PostOptions post={post} userId={userId} />
          </div>

          {post.comments.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5">
              <p className="text-xl font-extrabold lg:text-2xl">
                No comments yet.
              </p>
              <p className="text-sm font-medium">Start the conversation.</p>
            </div>
          ) : (
            <ScrollArea className="hidden flex-1 py-1.5 md:inline">
              <MiniPost post={post} />
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </ScrollArea>
          )}

          <div className="mt-auto hidden border-y p-2.5 px-2 md:block">
            <PostActions post={post} userId={userId} />
            <time className="text-[11px] font-medium uppercase text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <CommentForm
            postId={id}
            className="hidden border-none md:inline-flex"
          />
        </div>
      </Card>

      <div className="md:hidden">
        <Post post={post} />
      </div>
    </>
  );
}
export default SinglePost;
