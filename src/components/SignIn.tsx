"use client";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent, FormEvent, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let toastId = toast.loading("Loading...");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      toast.dismiss(toastId);
      toast.error(res.error, {
        style: { background: "red", color: "white" },
      });
    } else {
      toast.dismiss(toastId);
      toast.success("Signing in...", {
        duration: 2000,
      });
      router.push("/explore");
    }
  };

  const handleGoogleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.loading("Loading...");

    await signIn("google", {
      callbackUrl: "/explore",
      redirect: false,
    });
  };

  return (
    <main
      style={{ maxHeight: `calc(100svh - 120px)` }}
      className="flex flex-col justify-center items-center gap-8 h-screen"
    >
      <h1 className="text-3xl font-semibold">Sign in to your account</h1>

      <form
        className="w-[70vw] sm:w-[45vw] md:w-[37vw] lg:w-[28vw] xl:w-[24vw]"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="email">Email address</Label>
        <Input
          className="mb-5"
          type="text"
          id="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full my-5 text-base">
          Sign in
        </Button>

        <p className="text-center text-neutral-500">Or</p>

        <Button
          type="button"
          variant="outline"
          className="flex gap-4 w-full mt-4 py-6 text-base"
          onClick={handleGoogleSubmit}
        >
          <img
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            width={24}
            height={24}
            alt="Google icon"
          />
          Sign in with Google
        </Button>

        <p className="text-center text-sm text-neutral-500">
          Don&apos;t have an account?
          <Button
            type="button"
            variant="link"
            className="text-sm p-2 mt-2"
            onClick={(e) => {
              e.preventDefault();
              router.push("/auth/signup");
            }}
          >
            Sign up
          </Button>
        </p>
      </form>
    </main>
  );
}
