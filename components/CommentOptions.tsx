"use client";

import { CommentWithExtras } from "@/types";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { deleteComment } from "@/lib/actions";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";

interface Props {
  comment: CommentWithExtras;
}

function CommentOptions({ comment }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="hidden size-5 cursor-pointer group-hover:inline dark:text-neutral-400" />
      </DialogTrigger>

      <DialogContent className="dialogContent">
        <form
          action={async (formData) => {
            const { message } = await deleteComment(formData);
            toast(message);
          }}
          className="postOption"
        >
          <input type="hidden" name="id" value={comment.id} />
          <SubmitButton className="w-full p-3 font-bold text-red-500 disabled:cursor-not-allowed">
            Delete
          </SubmitButton>
        </form>

        <DialogClose className="postOption w-full border-0 p-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
export default CommentOptions;
