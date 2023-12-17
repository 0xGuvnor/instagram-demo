import { fetchPosts } from "@/lib/data";
import Post from "./Post";

interface Props {}

async function Posts({}: Props) {
  const posts = await fetchPosts();
  // console.log(posts);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
export default Posts;
