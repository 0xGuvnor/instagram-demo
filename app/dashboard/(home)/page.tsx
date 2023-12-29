import Posts from "@/components/Posts";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";
import { Suspense } from "react";

interface Props {}

function DashboardPage({}: Props) {
  return (
    <main className="growx flex w-full">
      <div className="mx-auto flex max-w-lg flex-1 flex-col gap-y-8 pb-20">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}
export default DashboardPage;
