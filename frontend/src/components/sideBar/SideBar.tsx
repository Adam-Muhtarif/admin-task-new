"use client";

import { MantineLogo } from "@mantinex/mantine-logo";
import { IconCategory, IconBrandBlogger } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const path = usePathname();

  return (
    <nav>
      <Link href="/">
        <MantineLogo className="w-40" />
      </Link>

      <ul className="mt-10 flex flex-col gap-3">
        <li
          className={`${
            path === "/posts" && "bg-blue-600 text-white"
          } p-1.5 transition-all`}
        >
          <Link href="/posts" className="flex items-center gap-2">
            <IconBrandBlogger size="1rem" stroke={1.5} /> Posts
          </Link>
        </li>
        <li
          className={`${
            path === "/categories" && "bg-blue-600 text-white"
          } p-1.5 transition-all`}
        >
          <Link href="/categories" className="flex items-center gap-2">
            <IconCategory size="1rem" stroke={1.5} /> Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
}
