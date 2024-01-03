import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";

export async function fetchPosts() {
  noStore();

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        likes: {
          include: { user: true },
        },
        savedBy: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPostById(id: string) {
  noStore();

  try {
    const data = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        likes: {
          include: { user: true },
        },
        savedBy: true,
        user: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPostsByUsername(username: string, postId?: string) {
  noStore();

  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: {
          id: postId,
        },
      },
      include: {
        comments: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        likes: {
          include: { user: true },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to fetch posts");
    throw new Error("Failed to fetch posts");
  }
}
