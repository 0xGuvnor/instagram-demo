import PostsGrid from "@/components/PostsGrid";
import { fetchPostsByUsername } from "@/lib/data";

interface Props {
  params: { username: string };
}

async function ProfilePage({ params: { username } }: Props) {
  const posts = await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
}
export default ProfilePage;
