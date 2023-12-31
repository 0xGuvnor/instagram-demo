import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  user: User & {
    username?: string | null | undefined;
  };
  isActive?: boolean;
  className?: string;
}

function UserAvatar({ user, isActive, className }: Props) {
  return (
    <Avatar
      className={cn("h-6 w-6", isActive && "border-2 border-white", className)}
    >
      <AvatarImage src={user.image!} alt={`${user.name}'s profile picture`} />
      <AvatarFallback className="text-xs">
        {user.username?.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  );
}
export default UserAvatar;
