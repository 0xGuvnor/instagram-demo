import { Dialog, DialogContent } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

function ViewPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="flex h-full max-h-[500px] flex-col items-start gap-0 p-0 md:max-w-3xl md:flex-row lg:max-h-[700px] lg:max-w-5xl xl:max-h-[800px] xl:max-w-6xl">
        <Skeleton className="relative h-96 w-full max-w-3xl overflow-hidden rounded-r-none md:h-[500px] lg:h-[700px] xl:h-[800px]" />

        <div className="flex h-full flex-1 flex-col py-4 pl-3.5 pr-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>

          <Skeleton className="my-4 flex-1" />

          <div className="flex w-full items-center space-x-4">
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default ViewPostSkeleton;
