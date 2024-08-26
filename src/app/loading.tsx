import dynamic from "next/dynamic";

const LoaderComponent = dynamic(() => import("@/components/Loader"), {
  ssr: false,
});

export default function Loading() {
  return <LoaderComponent />;
}
