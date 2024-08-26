import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import CreateBlogComponent from "@/components/CreateBlog";

export default async function CreateBlog() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return <CreateBlogComponent />;
}
