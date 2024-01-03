import MorePosts from "@/components/MorePosts";
import SinglePost from "@/components/SinglePost";
import SinglePostSkeleton from "@/components/skeletons/SinglePostSkeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

function PostPage({ params: { id } }: Props) {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>

      <Separator className="mx-auto my-12 max-w-3xl lg:max-w-4xl" />

      <Suspense>
        <MorePosts postId={id} />
      </Suspense>
    </div>
  );
}
export default PostPage;
