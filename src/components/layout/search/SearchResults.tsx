import React from "react";
import { SearchResult } from "./SearchResult";
import { Product } from "@/models";

function SearchResults({ results }: { results: Product[] }) {
  if (!results?.length) return null;

  return (
    <ul className="absolute bg-gray-50 top-12 left-0 w-full z-10 py-2 flex flex-col gap-2 rounded-sm">
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </ul>
  );
}

export default SearchResults;
