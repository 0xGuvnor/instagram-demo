import PostsGrid from "@/components/PostsGrid";
import { fetchSavedPostsByUsername } from "@/lib/data";

interface Props {
  params: { username: string };
}

async function SavedPostsPage({ params: { username } }: Props) {
  const savedPosts = await fetchSavedPostsByUsername(username);
  const posts = savedPosts.map((savedPost) => savedPost.post);

  return <PostsGrid posts={posts} />;
}
export default SavedPostsPage;
