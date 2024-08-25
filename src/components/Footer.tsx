import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-8 py-4 z-50 relative">
      <p className="text-neutral-400 font-medium text-sm">Blog App © 2024</p>

      <div className="flex items-center gap-2">
        <img
          className="w-6 h-6 dark:invert"
          src="https://img.icons8.com/?size=100&id=106562&format=png&color=000000"
          alt="Github Logo"
        />

        <Link
          href="https://github.com/Munadil16/blog-app"
          className="text-neutral-400 font-medium text-sm cursor-pointer"
          target="_blank"
        >
          View on Github
        </Link>
      </div>
    </footer>
  );
}
