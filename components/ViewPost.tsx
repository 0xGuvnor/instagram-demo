import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  className?: string;
}

function ViewPost({ className }: Props) {
  return (
    <div className={cn("flex p-3", className)}>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => window.location.reload()}
        className="h-auto p-0 text-sm font-semibold text-sky-500 hover:bg-transparent hover:text-sky-700"
      >
        View post
      </Button>
    </div>
  );
}
export default ViewPost;
