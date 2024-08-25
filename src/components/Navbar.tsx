"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PenBoxIcon } from "lucide-react";
import ThemeDropDown from "./ThemeDropDown";
import ProfileIconDropDown from "./ProfileIconDropDown";

export default function Navbar() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 h-16 w-full flex items-center justify-between p-4 border-b bg-white dark:bg-zinc-950">
      <p
        className="font-medium text-xl cursor-pointer"
        onClick={() => router.push("/")}
      >
        Blog App
      </p>

      <ul className="flex items-center gap-4 md:gap-6">
        <ThemeDropDown />

        {status === "authenticated" ? (
          <>
            <li
              className="flex gap-2 cursor-pointer hover:text-neutral-400 select-none"
              onClick={() => router.push("/user/create-blog")}
            >
              <PenBoxIcon /> Create
            </li>

            <ProfileIconDropDown data={data} />
          </>
        ) : (
          <>
            <li
              className="cursor-pointer hover:text-neutral-400 select-none"
              onClick={() => router.push("/explore")}
            >
              Explore
            </li>

            <li
              className="cursor-pointer hover:text-neutral-400 select-none"
              onClick={() => router.push("/auth/signin")}
            >
              Sign in
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
