import { cn } from "@/lib/utils";
import { Shirt } from "lucide-react";
import Link from "next/link";
import React from "react";

function HeaderCustomerLeft({ className }: { className?: string }) {
  return (
    <div className={cn("text-primary brightness-75", className)}>
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold md:text-lg"
      >
        <Shirt strokeWidth={1.5} size={32} />
        <span className="whitespace-nowrap">Shop App</span>
      </Link>
    </div>
  );
}

export default HeaderCustomerLeft;
