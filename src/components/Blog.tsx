"use client";

import { useRouter } from "next/navigation";

interface UserProps {
  username: string;
  image: string | null;
}

interface BlogProps {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  user: UserProps;
}

export default function Blog({ blog }: { blog: BlogProps }) {
  const router = useRouter();

  const { title, createdAt, id, image, content } = blog;
  const { username, image: profile } = blog.user;

  const redirectToSpecificBlog = () => {
    router.push(`/explore/blog/${id}`);
  };

  return (
    <article
      className="flex justify-between items-center cursor-pointer border-b p-4"
      onClick={redirectToSpecificBlog}
    >
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">{title}</p>

        <div className="flex items-center gap-2">
          {profile !== null ? (
            <img
              className="rounded-full"
              src={profile}
              width={24}
              height={24}
              alt="Profile image"
            />
          ) : (
            <p className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></p>
          )}

          <p className="font-medium">{username}</p>
          <p className="w-[0.2rem] h-[0.2rem] bg-neutral-400 rounded-full"></p>

          <p className="text-xs font-medium text-neutral-500">
            {new Date(createdAt).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <p className="text-sm text-neutral-500">{`${Math.ceil(
          content.length / 500
        )} min(s) read`}</p>
      </div>

      <img className="w-20 h-20 md:w-32" src={image} alt="Blog post image" />
    </article>
  );
}
