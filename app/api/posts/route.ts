import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const newPost = await prisma.blogPost.findMany()
    return NextResponse.json(newPost);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, author, profile, content, imageUrl} = body;
    const newPost = await prisma.blogPost.create({
      data: {
        title,
        author,
        profile, 
        content,
        imageUrl
      },
    });
    
    return NextResponse.json(newPost);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const {serial, likes, dislikes} = await request.json();
    await prisma.blogPost.update({
      where: { serial: serial },
      data: {
        likes,
        dislikes
      },
    });
    return NextResponse.json({ message: 'Deu certo' });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
