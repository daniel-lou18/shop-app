import Image from "next/image";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { Product } from "@/features/products/Product";

export const SearchResult = ({ result }: { result: Product }) => {
  return (
    <Link
      href={paths.customerProduct(result.id)}
      className="flex gap-2 hover:bg-slate-100"
    >
      <div className="w-12 h-12 overflow-hidden rounded-sm">
        <Image
          src={result.image || "/placeholder.svg"}
          alt={result.name}
          width={80}
          height={80}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="hit-name text-sm">{result.name}</div>
        <div className="hit-brand.name text-xs">{result.brandName}</div>
      </div>
    </Link>
  );
};
