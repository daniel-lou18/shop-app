import { cn } from "@/lib/utils";
import { Shirt } from "lucide-react";
import Link from "next/link";
import React from "react";
import BaseComponent from "./BaseComponent";

type HeaderLogoProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
};

function HeaderLogo({ href, className, onClick }: HeaderLogoProps) {
  return (
    <BaseComponent
      className={`text-primary brightness-75 ${className}`}
      onClick={onClick}
    >
      <Link
        href={href || "/"}
        className="flex items-center gap-2 font-semibold md:text-lg"
      >
        <Shirt strokeWidth={1.5} size={32} />
        <BaseComponent tag="span" className="whitespace-nowrap">
          Shop App
        </BaseComponent>
      </Link>
    </BaseComponent>
  );
}

export default HeaderLogo;
