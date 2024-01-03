"use client";

import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { useRouter } from "next/navigation";

function EditNotFound() {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <Frown className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <Button
        onClick={() => router.back()}
        variant={"outline"}
        size={"default"}
        className="mt-4"
      >
        Go back
      </Button>
    </main>
  );
}
export default EditNotFound;
