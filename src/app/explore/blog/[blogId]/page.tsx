import { notFound } from "next/navigation";
import FullBlogComponent from "@/components/FullBlog";
import prisma from "@/db";

export default async function FullBlog({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const blogContent = await prisma.blog.findFirst({
    where: {
      id: Number(blogId),
    },
    select: {
      title: true,
      content: true,
      image: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  if (!blogContent) {
    notFound();
  }

  return <FullBlogComponent blogContent={blogContent} />;
}
