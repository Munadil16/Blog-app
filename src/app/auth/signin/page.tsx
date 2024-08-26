import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignInComponent from "@/components/SignIn";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/explore");
  }

  return <SignInComponent />;
}
