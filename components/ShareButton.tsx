"use client";

import { Link, Send } from "lucide-react";
import ActionIcon from "./ActionIcon";
import { toast } from "sonner";

interface Props {
  postId: string;
}

function ShareButton({ postId }: Props) {
  const handleClick = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/dashboard/p/${postId}`,
    );

    toast("Link copied to clipboard.", { icon: <Link className="h-5 w-5" /> });
  };

  return (
    <ActionIcon onClick={handleClick}>
      <Send className="h-6 w-6" />
    </ActionIcon>
  );
}
export default ShareButton;
