import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

function ButtonsGender({
  data,
  className,
}: {
  data: { name: string; href: string }[];
  className?: string;
}) {
  if (!data?.length) return null;

  return (
    <div className={cn("flex gap-4 justify-end md:text-xl", className)}>
      {data.map(({ name, href }) => (
        <Button
          variant="outline"
          className="text-base min-w-32 bg-transparent rounded-sm text-white uppercase border-2"
          asChild
          key={name}
        >
          <Link href={href}>{name}</Link>
        </Button>
      ))}
    </div>
  );
}

export default ButtonsGender;
