import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import SearchResults from "./SearchResults";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import { useEffect, useRef, useState } from "react";

export default function SearchField() {
  const { error, products, query, setQuery } = useSearchProducts();
  const [isVisible, setIsVisible] = useState(true);
  const inputFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        inputFieldRef.current &&
        !inputFieldRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (query) {
      setIsVisible(true);
    }
  }, [query]);

  return (
    <div ref={inputFieldRef} className="relative ml-auto flex-1 md:grow-0">
      <SearchIcon className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={error || "Rechercher un produit"}
        className={`${
          error ? "border-red-400" : ""
        } w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isVisible && <SearchResults results={products} />}
    </div>
  );
}
