"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  children: ReactNode;
  href: string;
};

function NavLink({ children, href }: NavLinkProps) {
  const pathName = usePathname();

  return (
    <Link
      href={href}
      className={`text-foreground transition-colors hover:text-primary font-semibold text-base ${
        pathName === href ? "text-primary brightness-75" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
