import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/db";

interface CreateBlogProps {
  title: string;
  imageUrl: string;
  content: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const body: CreateBlogProps = await req.json();
  const { title, imageUrl, content } = body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email ?? "",
      },
      select: {
        id: true,
      },
    });

    await prisma.blog.create({
      data: {
        title,
        image: imageUrl,
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json({ message: "Blog published", success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error, succes: false });
  }
}
