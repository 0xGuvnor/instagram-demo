import { auth } from "@/auth";
import { PostWithExtras } from "@/types";

interface Props {
  post: PostWithExtras;
}

async function Post({ post }: Props) {
  const session = await auth();
  const userId = session?.user.id;
  const username = post.user.username;

  return <div>Post</div>;
}
export default Post;
