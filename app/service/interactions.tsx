import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(authorName, title, imageURL) {
  const post = await prisma.post.create({
    data: {
      authorName,
      title,
      imageURL,
      likes: 0,
      dislikes: 0,
    },
  });
  return post;
}

export async function deletePost(authorName, title, imageURL) {
  const post = await prisma.post.create({
    data: {
      authorName,
      title,
      imageURL,
      likes: 0,
      dislikes: 0,
    },
  });
  return post;
}

export async function updatePost(authorName, title, imageURL) {
  const post = await prisma.post.create({
    data: {
      authorName,
      title,
      imageURL,
      likes: 0,
      dislikes: 0,
    },
  });
  return post;
}
