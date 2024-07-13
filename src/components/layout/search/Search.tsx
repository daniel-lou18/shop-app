import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import SearchResults from "./SearchResults";
import { useSearch } from "@/hooks/useSearch";

export default function SearchField() {
  const { error, filteredProducts, query, setQuery } = useSearch();

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
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
      {query && filteredProducts.length > 0 && (
        <SearchResults results={filteredProducts} />
      )}
    </div>
  );
}
