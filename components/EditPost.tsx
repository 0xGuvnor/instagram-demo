"use client";

import useMount from "@/hooks/useMount";
import { UpdatePost } from "@/lib/schemas";
import { PostWithExtras } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { updatePost } from "@/lib/actions";
import { toast } from "sonner";
import Error from "./Error";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  id: string;
  post: PostWithExtras;
}

function EditPost({ id, post }: Props) {
  const isMounted = useMount();
  const pathname = usePathname();
  const isEditPage = pathname === `/dashboard/p/${id}/edit`;
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdatePost>>({
    resolver: zodResolver(UpdatePost),
    defaultValues: {
      id: post.id,
      caption: post.caption || "",
      fileUrl: post.fileUrl,
    },
  });
  const fileUrl = form.watch("fileUrl");

  const onSubmit = async (values: z.infer<typeof UpdatePost>) => {
    const res = await updatePost(values);

    if (res) {
      return toast.error(<Error res={res} />);
    }
  };

  if (!isMounted) return null;
  return (
    <Dialog open={isEditPage} onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit info</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="h-96 overflow-hidden rounded-md md:h-[450px]">
              <AspectRatio ratio={1 / 1} className="relative h-full">
                <Image
                  src={fileUrl}
                  alt="Post preview"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="caption">Caption</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="caption"
                      placeholder="Write a caption..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              Done
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export default EditPost;
