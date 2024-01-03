import { AspectRatio } from "../ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";

function EditPostSkeleton() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>Edit info</DialogHeader>

        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>

        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  );
}
export default EditPostSkeleton;
