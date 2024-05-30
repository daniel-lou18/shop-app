"use client";

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
      className={`font-semibold text-base ${
        pathName === href ? "text-primary" : ""
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
