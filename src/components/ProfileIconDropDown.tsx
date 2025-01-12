import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function ProfileIconDropDown({ data }: { data: Session }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li>
          {data?.user?.image !== undefined ? (
            <img
              className="rounded-full cursor-pointer"
              src={data?.user?.image ?? ""}
              width={32}
              height={32}
              alt="Profile image"
            />
          ) : (
            <p className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer"></p>
          )}
        </li>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => router.push("/user/profile")}
        >
          Profile
          <img
            className="dark:invert"
            src="https://img.icons8.com/?size=100&id=2yC9SZKcXDdX&format=png&color=000000"
            width={20}
            height={20}
            alt="Profile icon"
          />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push("/explore")}>
          Explore
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => signOut()}
        >
          Logout
          <img
            className="dark:invert"
            src="https://img.icons8.com/?size=100&id=BdksXmxLaK8r&format=png&color=000000"
            width={20}
            height={20}
            alt="Logout icon"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
