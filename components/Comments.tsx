"use client";

import { CreateComment } from "@/lib/schemas";
import { CommentWithExtras } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createComment } from "@/lib/actions";

interface Props {
  postId: string;
  comments: CommentWithExtras[];
  user?: User;
}

function Comments({ postId, comments, user }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: { body: "", postId },
  });

  const [optimisticComments, addOptimisticComment] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    // @ts-ignore
    (state: CommentWithExtras[], newComment: string) => [
      { body: newComment, userId: user?.id, postId, user },
      ...state,
    ],
  );

  const body = form.watch("body");
  const commentsCount = optimisticComments.length;

  return (
    <div className="space-y-0.5">
      {commentsCount > 1 && (
        <Link
          scroll={false}
          href={`/dashboard/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentsCount} comments
        </Link>
      )}

      {optimisticComments.slice(0, 3).map((comment, index) => {
        const commenter = comment.user.username;

        return (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <Link href={`/dashboard/${commenter}`} className="font-semibold">
              {commenter}
            </Link>
            <p>{comment.body}</p>
          </div>
        );
      })}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const valuesCopy = { ...values };
            form.reset();
            startTransition(() => {
              addOptimisticComment(valuesCopy.body);
            });

            await createComment(valuesCopy);
          })}
          className="flex items-center justify-between space-x-2 border-b border-gray-300 py-1 pb-3 dark:border-neutral-800"
        >
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="flex w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border-none bg-transparent p-0 text-sm font-medium placeholder-neutral-500 focus:outline-none dark:text-white dark:placeholder-neutral-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {body.trim().length > 0 && (
            <Button
              type="submit"
              variant={"ghost"}
              size={"sm"}
              className="text-sm font-semibold text-sky-500 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:hover:text-sky-500"
            >
              Post
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
export default Comments;
