import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="flex flex-col gap-10 min-h-[75svh] mt-8">
      <article className="flex items-center justify-center p-4">
        <div className="flex items-center justify-center gap-6 w-dvw md:w-[70vw] xl:w-[50vw]">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-60 md:w-[35vw] h-8" />

            <div className="flex gap-2 items-center">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 md:w-32 h-6" />
              <Skeleton className="w-20 md:w-24 h-6" />
            </div>

            <Skeleton className="w-28 h-6" />
          </div>

          <Skeleton className="w-20 h-20 md:w-28 md:h-28" />
        </div>
      </article>

      <article className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-6 p-2 w-dvw md:w-[70vw] xl:w-[50vw]">
          <div className="flex flex-col gap-3">
            <Skeleton className="w-60 md:w-[35vw] h-8" />

            <div className="flex gap-2 items-center">
              <Skeleton className="w-7 h-7 rounded-full" />
              <Skeleton className="w-20 md:w-32 h-6" />
              <Skeleton className="w-20 md:w-24 h-6" />
            </div>

            <Skeleton className="w-28 h-6" />
          </div>

          <Skeleton className="w-20 h-20 md:w-28 md:h-28" />
        </div>
      </article>
    </section>
  );
}
