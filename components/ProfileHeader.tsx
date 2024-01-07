import { ChevronDown, Settings, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  username: string;
}

function ProfileHeader({ username }: Props) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex w-full items-center border-b border-zinc-300 bg-white px-3 py-1 md:hidden dark:border-neutral-700 dark:bg-neutral-950">
      <Button size={"icon"} variant={"ghost"}>
        <Settings />
      </Button>

      <div className="mx-auto flex items-center gap-x-2">
        <p className="font-bold">{username}</p>
        <ChevronDown />
      </div>

      <Button size={"icon"} variant={"ghost"}>
        <UserPlus />
      </Button>
    </header>
  );
}
export default ProfileHeader;
