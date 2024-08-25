import { BackgroundBeams } from "@/components/ui/background-beam";

export default function Home() {
  return (
    <main
      style={{ maxHeight: `calc(100svh - 120px)` }}
      className="flex justify-center items-center h-screen"
    >
      <section className="flex flex-col items-center gap-6 w-[90%] sm:w-full">
        <h1 className="text-6xl font-semibold text-center">
          Welcome to Blog App
        </h1>

        <p className="text-neutral-500 font-medium text-center">
          Discover insightful articles on technology, design, and innovation.
        </p>
      </section>

      <BackgroundBeams />
    </main>
  );
}
