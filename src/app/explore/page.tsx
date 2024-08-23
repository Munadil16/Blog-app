import Blog from "@/components/Blog";
import prisma from "@/db";

export default async function Explore() {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
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
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="flex justify-center">
      <section className="w-dvw md:w-[70vw] xl:w-[50vw]">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </section>
    </main>
  );
}
