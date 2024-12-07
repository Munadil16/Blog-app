"use client";

import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button className="w-1/5" variant="default" onClick={() => router.back()}>
      <ArrowLeft className="w-4 mr-2" />
      Back
    </Button>
  );
};
