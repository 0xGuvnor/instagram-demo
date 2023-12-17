"use server";

import { z } from "zod";
import { CreatePost } from "./schemas";
import { getUserId } from "./utils";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const userId = await getUserId();

  const validatedFields = CreatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create post.",
    };
  }

  const { fileUrl, caption } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to create post.",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
