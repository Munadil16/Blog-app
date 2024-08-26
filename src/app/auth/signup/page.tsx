import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignUpComponent from "@/components/SignUp";

export default async function SignUp() {
  const session = await getServerSession();

  if (session) {
    redirect("/explore");
  }
  return <SignUpComponent />;
}
