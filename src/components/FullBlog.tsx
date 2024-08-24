import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

interface BlogProps {
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  user: {
    username: string;
    image: string | null;
  };
}

export default function FullBlogComponent({
  blogContent,
}: {
  blogContent: BlogProps | null;
}) {
  if (!blogContent) {
    return null;
  }

  const { title, image, content, createdAt } = blogContent;
  const { image: profile, username: name } = blogContent.user;

  return (
    <main className="flex items-center justify-center">
      <section className="flex flex-col gap-6 mt-4 w-[50vw]">
        <h1 className="text-4xl font-extrabold">{title}</h1>

        <div className="flex items-center gap-6 border-b pb-10">
          {profile ? (
            <img
              className="w-10 h-10 rounded-full"
              src={profile}
              alt="Profile image"
            />
          ) : (
            <p className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></p>
          )}

          <div className="flex flex-col">
            <p>{name}</p>

            <div className="flex items-center gap-2">
              <p className="text-sm text-neutral-500 font-medium">
                {new Date(createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="w-[0.15rem] h-[0.15rem] bg-neutral-500 rounded-full"></p>

              <p className="text-sm text-neutral-500 font-medium">{`${Math.ceil(
                content.length / 500
              )} min(s) read`}</p>
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
              content
            ),
          }}
          className="leading-loose tracking-wider"
        ></div>

        <img className="mb-10" src={image} alt="Blog post image" />
      </section>
    </main>
  );
}
