"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useMount from "@/hooks/useMount";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePost } from "@/lib/schemas";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import Error from "@/components/Error";
import { createPost } from "@/lib/actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

function CreatePage() {
  const pathname = usePathname();
  const router = useRouter();
  const isMounted = useMount();
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: "",
      fileUrl: undefined,
    },
  });

  const fileUrl = form.watch("fileUrl");
  const isCreatePage = pathname === "/dashboard/create";

  if (!isMounted) return null;
  return (
    <div>
      <Dialog
        open={isCreatePage}
        onOpenChange={(open) => !open && router.back()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new post</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                const res = await createPost(values);
                if (res) {
                  toast.error(<Error res={res} />);
                }
              })}
              className="space-y-4"
            >
              {!!fileUrl ? (
                <AspectRatio
                  ratio={1 / 1}
                  className={cn(
                    "h-96 overflow-hidden rounded-md md:h-[450px]",
                    isLoading && "animate-pulse bg-gray-700",
                  )}
                >
                  <Image
                    src={fileUrl}
                    alt="Post preview"
                    fill
                    priority
                    onLoadingComplete={() => setIsLoading(false)}
                    className="object-cover"
                  />
                </AspectRatio>
              ) : (
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="picture"
                        className="flex items-center justify-center py-2"
                      >
                        <span>Picture</span>
                      </FormLabel>
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            form.setValue("fileUrl", res[0].url);
                            toast.success("Upload complete");
                          }}
                          onUploadError={(error: Error) => {
                            console.error(error);
                            toast.error("Upload failed");
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-center">
                        Upload a picture to post.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!!fileUrl && (
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
              )}

              <Button
                type="submit"
                disabled={form.formState.isSubmitting || !fileUrl}
              >
                Create Post
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default CreatePage;
