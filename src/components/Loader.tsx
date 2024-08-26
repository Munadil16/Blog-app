"use client";

import { tailspin } from "ldrs";

tailspin.register();

export default function loading() {
  return (
    <div className="flex justify-center items-center min-h-[80svh] dark:invert">
      <l-tailspin size="40" stroke="5" speed="0.7" color="black"></l-tailspin>
    </div>
  );
}
