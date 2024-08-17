"use client";

import { FormEvent, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import axios from "axios";

export default function SignUpComponent() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let toastId = toast.loading("Loading...");

    try {
      const res = await axios.post("/api/auth/user", {
        username,
        email,
        password,
      });

      const { message, success } = res.data;

      if (success) {
        toast.dismiss(toastId);
        toast.success(message);
        router.push("/auth/signin");
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message, {
        style: { background: "red", color: "white" },
      });
    }
  };

  const handleGoogleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.loading("Loading...");

    await signIn("google", {
      callbackUrl: "/",
      redirect: false,
    });
  };

  return (
    <main className="flex flex-col justify-center items-center gap-8 h-screen">
      <h1 className="text-3xl font-semibold">Create an account</h1>

      <form
        className="w-[70vw] sm:w-[45vw] md:w-[37vw] lg:w-[28vw] xl:w-[24vw]"
        onSubmit={handleSubmit}
      >
        <Label htmlFor="name">Username</Label>
        <Input
          className="mb-5"
          type="text"
          id="name"
          placeholder="Name"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          Sign up
        </Button>

        <p className="text-center text-neutral-500">Or</p>

        <Button
          type="button"
          variant="outline"
          className="flex gap-4 w-full mt-4 py-6 text-base"
          onClick={handleGoogleSubmit}
        >
          <img
            className="w-6"
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            alt="Google icon"
          />
          Continue with Google
        </Button>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?
          <Button
            type="button"
            variant="link"
            className="text-sm p-2 mt-2"
            onClick={(e) => {
              e.preventDefault();
              router.push("/auth/signin");
            }}
          >
            Sign in
          </Button>
        </p>
      </form>
    </main>
  );
}
