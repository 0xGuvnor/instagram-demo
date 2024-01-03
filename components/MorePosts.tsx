import { fetchPostById, fetchPostsByUsername } from "@/lib/data";
import Link from "next/link";
import PostsGrid from "./PostsGrid";

interface Props {
  postId: string;
}

async function MorePosts({ postId }: Props) {
  const post = await fetchPostById(postId);
  const postUsername = post?.user.username;

  if (!postUsername) return null;

  const posts = await fetchPostsByUsername(postUsername, postId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-3 pb-20 lg:max-w-4xl">
      <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
        More posts from{" "}
        <Link
          href={`/dashboard/${postUsername}`}
          className="text-black hover:opacity-50 dark:text-white"
        >
          {postUsername}
        </Link>
      </p>

      <PostsGrid posts={posts} />
    </div>
  );
}
export default MorePosts;
