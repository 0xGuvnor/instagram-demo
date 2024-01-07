"use client";

import useMount from "@/hooks/useMount";
import { UpdateUser } from "@/lib/schemas";
import { UserWithExtras } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserAvatar from "./UserAvatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { updateProfile } from "@/lib/actions";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import SubmitButton from "./SubmitButton";

interface Props {
  children: ReactNode;
  user: UserWithExtras;
}

function ProfileAvatar({ children, user }: Props) {
  const { data: session } = useSession();
  const isCurrentUser = session?.user.id === user.id;
  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      id: user.id,
      image: user.image || "",
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      gender: user.gender || "",
      website: user.website || "",
    },
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const isMounted = useMount();

  const onSubmit = async (values: z.infer<typeof UpdateUser>) => {
    const { message } = await updateProfile(values);
    toast(message);

    setOpen(false);
  };

  if (!isMounted || !session) return null;
  if (!isCurrentUser)
    return <UserAvatar user={user} className="size-20 md:size-36" />;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="dialogContent">
        <DialogHeader>
          <DialogTitle className="mx-auto py-5 text-xl font-medium">
            Change Profile Photo
          </DialogTitle>
        </DialogHeader>

        {isCurrentUser && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          form.setValue("image", res[0].url);

                          if (buttonRef.current) {
                            buttonRef.current.click();
                          }
                        }}
                        onUploadError={(error: Error) => {
                          console.error(error);
                          toast.error("Upload failed");
                        }}
                        className="h-11 border-y border-zinc-300 text-sm ut-button:w-full ut-button:bg-transparent ut-button:font-bold ut-button:text-blue-500 ut-button:ring-0 ut-button:ring-offset-0 ut-button:focus-visible:ring-0 ut-allowed-content:hidden dark:border-neutral-700"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {user.image && (
                <SubmitButton
                  onClick={() => {
                    form.setValue("image", "");

                    if (buttonRef.current) {
                      buttonRef.current.click();
                    }
                  }}
                  disabled={form.formState.isSubmitting}
                  className="w-full border-b border-zinc-300 p-3 text-sm font-bold text-red-500 disabled:cursor-not-allowed dark:border-neutral-700"
                >
                  Remove Current Photo
                </SubmitButton>
              )}

              <button type="submit" hidden ref={buttonRef} />
            </form>
          </Form>
        )}

        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export default ProfileAvatar;
