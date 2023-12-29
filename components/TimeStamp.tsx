"use client";

import useMount from "@/hooks/useMount";
import { cn } from "@/lib/utils";
import TimeAgo from "react-timeago";

interface Props {
  createdAt: Date;
  className?: string;
}

function TimeStamp({ createdAt, className }: Props) {
  const isMounted = useMount();

  if (!isMounted) return null;
  return (
    <TimeAgo
      date={createdAt}
      className={cn(
        "text-xs font-medium text-neutral-500 dark:text-neutral-400",
        className,
      )}
    />
  );
}
export default TimeStamp;
