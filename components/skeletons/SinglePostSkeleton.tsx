import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import UserAvatarSkeleton from "./UserAvatarSkeleton";

function SinglePostSkeleton() {
  return (
    <Card className="mx-auto hidden max-w-3xl md:flex lg:max-w-4xl">
      <div className="relative h-[450px] w-full max-w-sm overflow-hidden lg:max-w-lg">
        <Skeleton className="size-full" />
      </div>

      <div className="flex max-w-sm flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3 px-5">
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
          <UserAvatarSkeleton />
        </div>
      </div>
    </Card>
  );
}
export default SinglePostSkeleton;
