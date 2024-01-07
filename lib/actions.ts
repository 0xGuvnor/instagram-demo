"use server";

import { z } from "zod";
import {
  BookmarkSchema,
  CreateComment,
  CreatePost,
  DeleteComment,
  DeletePost,
  FollowUser,
  LikeSchema,
  UpdatePost,
  UpdateUser,
} from "./schemas";
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

export async function deletePost(formData: FormData) {
  const userId = await getUserId();

  const { id } = DeletePost.parse({ id: formData.get("id") });

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
    return { message: "Post deleted." };
  } catch (error) {
    return { message: "Error deleting post." };
  }
}

export async function likePost(value: FormDataEntryValue | null) {
  const userId = await getUserId();

  const validatedFields = LikeSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to like post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const like = await prisma.like.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (like) {
    try {
      await prisma.like.delete({
        where: {
          postId_userId: { postId, userId },
        },
      });

      revalidatePath("/dashboard");
      return { message: "Unliked post." };
    } catch (error) {
      return { message: "Failed to unlike post" };
    }
  } else {
    try {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });

      revalidatePath("/dashboard");
      return { message: "Liked post." };
    } catch (error) {
      return { message: "Failed to like post" };
    }
  }
}

export async function bookmarkPost(value: FormDataEntryValue | null) {
  const userId = await getUserId();

  const validatedFields = BookmarkSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to bookmark post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const bookmark = await prisma.savedPost.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  if (bookmark) {
    try {
      await prisma.savedPost.delete({
        where: {
          postId_userId: { postId, userId },
        },
      });

      revalidatePath("/dashboard");
      return { message: "Bookmark deleted." };
    } catch (error) {
      return { message: "Error deleting bookmark." };
    }
  } else {
    try {
      await prisma.savedPost.create({
        data: {
          postId,
          userId,
        },
      });

      revalidatePath("/dashboard");
      return { message: "Post bookmarked." };
    } catch (error) {
      return { message: "Error creating bookmark." };
    }
  }
}

export async function createComment(values: z.infer<typeof CreateComment>) {
  const userId = await getUserId();

  const validatedFields = CreateComment.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create comment.",
    };
  }

  const { body, postId } = validatedFields.data;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  try {
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });

    revalidatePath("/dashboard");
    return { message: "Comment posted." };
  } catch (error) {
    return { message: "Failed to create comment." };
  }
}

export async function deleteComment(formData: FormData) {
  const userId = await getUserId();

  const { id } = DeleteComment.parse({ id: formData.get("id") });

  const comment = await prisma.comment.findUnique({ where: { id, userId } });

  if (!comment) {
    throw new Error("Comment not found.");
  }

  try {
    await prisma.comment.delete({ where: { id } });

    revalidatePath("/dashboard");
    return { message: "Comment deleted." };
  } catch (error) {
    return { message: "Failed to delete comment." };
  }
}

export async function updatePost(values: z.infer<typeof UpdatePost>) {
  const userId = await getUserId();

  const validatedFields = UpdatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update post",
    };
  }

  const { fileUrl, id, caption } = validatedFields.data;

  const post = await prisma.post.findUnique({ where: { id, userId } });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await prisma.post.update({
      where: { id },
      data: { fileUrl, caption },
    });
  } catch (error) {
    return { message: "Failed to update post." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProfile(values: z.infer<typeof UpdateUser>) {
  const userId = await getUserId();

  const validatedFields = UpdateUser.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update profile.",
    };
  }

  const { bio, gender, image, name, username, website } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { username, bio, gender, image, name, website },
    });

    revalidatePath("/dashboard/");

    return { message: "Profile updated." };
  } catch (error) {
    return { message: "Failed to update profile." };
  }
}

export async function followUser(formData: FormData) {
  const userId = await getUserId();

  const { id } = FollowUser.parse({ id: formData.get("id") });

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error("User not found");
  }

  const follows = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: id,
      },
    },
  });

  if (follows) {
    try {
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: id,
          },
        },
      });

      revalidatePath("/dashboard");
      return { message: "Unfollowed." };
    } catch (error) {
      return { message: "Failed to unfollow." };
    }
  }

  try {
    await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    });

    revalidatePath("/dashboard");
    return { message: "Followed." };
  } catch (error) {
    return { message: "Failed to follow." };
  }
}
