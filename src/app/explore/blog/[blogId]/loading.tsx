import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <article className="flex items-center justify-center p-4 min-h-[75svh]">
      <div className="flex items-center justify-center gap-6 w-dvw md:w-[70vw] xl:w-[50vw]">
        <div className="flex flex-col gap-3">
          <Skeleton className="w-60 md:w-[45vw] h-12" />

          <div className="flex gap-2 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />

            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 md:w-32 h-4" />
              <Skeleton className="w-20 md:w-24 h-4" />
            </div>
          </div>

          <Skeleton className="w-full h-96" />
        </div>
      </div>
    </article>
  );
}
