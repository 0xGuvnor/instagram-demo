import { Skeleton } from "../ui/skeleton";

function PostSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]"></Skeleton>
          <Skeleton className="h-4 w-[250px]"></Skeleton>
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  );
}

function PostsSkeleton() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
}
export default PostsSkeleton;
