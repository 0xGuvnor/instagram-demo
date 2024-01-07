import { HardHat } from "lucide-react";

interface Props {
  params: { username: string };
}

function TaggedPage({ params: { username } }: Props) {
  return (
    <div className="flex items-center justify-center gap-1 text-xl">
      For future development <HardHat />
    </div>
  );
}
export default TaggedPage;
