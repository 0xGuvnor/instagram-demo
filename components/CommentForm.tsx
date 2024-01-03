"use client";

import { CreateComment } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { createComment } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {
  postId: string;
  className?: string;
  inputRef?: RefObject<HTMLInputElement>;
}

function CommentForm({ postId, className, inputRef }: Props) {
  const form = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: { body: "", postId },
  });

  const body = form.watch("body");
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CreateComment>) => {
    await createComment(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative flex w-full items-center space-x-2 border-b border-gray-200 py-3 pl-3 dark:border-neutral-800",
          className,
        )}
      >
        {isSubmitting && (
          <div className="absolute flex w-full items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Add a comment..."
                  className="h-auto flex-1 border-none bg-transparent p-0 text-sm font-medium placeholder-neutral-400 focus:outline-none disabled:opacity-30 dark:text-neutral-400 dark:placeholder-neutral-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={"ghost"}
          size={"sm"}
          disabled={!body.trim().length || isSubmitting}
          className="text-sm font-semibold text-sky-500 hover:text-sky-700 disabled:cursor-not-allowed disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:hover:text-white dark:disabled:text-slate-500 dark:disabled:hover:text-slate-500"
        >
          Post
        </Button>
      </form>
    </Form>
  );
}
export default CommentForm;
