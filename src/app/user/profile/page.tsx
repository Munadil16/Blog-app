import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/db";
import Blog from "@/components/Blog";

export default async function Profile() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const [userDetails, blogs] = await Promise.all([
    prisma.user.findFirst({
      where: {
        email: session.user.email ?? "",
      },
      select: {
        createdAt: true,
      },
    }),

    prisma.blog.findMany({
      where: {
        user: {
          email: session.user.email ?? "",
        },
      },
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
    }),
  ]);

  return (
    <main className="flex flex-col justify-center items-center gap-8 pt-10">
      <section className="flex items-center gap-10 w-dvw md:w-[80vw] border-b pl-5 pb-10">
        {session.user.image ? (
          <Image
            className="rounded-full"
            src={session.user.image}
            width={112}
            height={112}
            alt="Profile image"
          />
        ) : (
          <p className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></p>
        )}

        <div className="flex flex-col gap-6">
          <p className="text-2xl font-medium">{session.user.name}</p>
          <p className="text-sm text-neutral-400">
            Joined{" "}
            {new Date(userDetails?.createdAt ?? "").toLocaleDateString(
              "en-us",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>
      </section>

      <section className="w-dvw md:w-[70vw] min-h-[45svh]">
        {blogs.length === 0 && (
          <p className="text-center text-neutral-400 font-medium">
            No blogs created yet.{" "}
            <Link className="text-[#369bff] underline" href="/user/create-blog">
              Create
            </Link>{" "}
            your first blog!
          </p>
        )}

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </section>
    </main>
  );
}
