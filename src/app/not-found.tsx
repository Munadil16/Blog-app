"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col justify-center items-center gap-6 min-h-[80svh]">
      <h1 className="text-6xl font-medium">Page not found</h1>

      <p className="text-neutral-500 font-medium">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>

      <Button className="font-medium" onClick={() => router.push("/")}>
        Go back home
      </Button>
    </main>
  );
}
