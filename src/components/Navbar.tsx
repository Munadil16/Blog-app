"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PenBoxIcon } from "lucide-react";
import ThemeDropDown from "./ThemeDropDown";

export default function Navbar() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <nav className="sticky top-0 z-50 h-16 w-full flex items-center justify-between p-4 border-b">
      <p className="font-medium text-xl">Blog App</p>

      <ul className="flex items-center gap-4 md:gap-6">
        <ThemeDropDown />

        {status === "authenticated" ? (
          <>
            <li
              className="flex gap-2 cursor-pointer hover:text-neutral-400 select-none"
              onClick={() => router.push("/create-blog")}
            >
              <PenBoxIcon /> Create
            </li>

            <li>
              {data?.user?.image !== undefined ? (
                <img
                  className="w-8 rounded-full cursor-pointer"
                  src={data?.user?.image ?? ""}
                  alt="Profile image"
                />
              ) : (
                <p className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"></p>
              )}
            </li>
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
