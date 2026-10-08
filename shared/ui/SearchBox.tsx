import type { ReactNode } from "react";
import { Search } from "lucide-react";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  aside?: ReactNode;
}

interface SearchBoxProps {
  query: string;
  placeholder: string;
  results: SearchResult[];
  emptyMessage: string;
  onQueryChange: (value: string) => void;
  onSelect: (result: SearchResult) => void;
}

export function SearchBox({ query, placeholder, results, emptyMessage, onQueryChange, onSelect }: SearchBoxProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        value={query}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onQueryChange(event.target.value)}
        className="h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-3 text-sm focus:border-neutral-900 focus:bg-white focus:outline-none"
      />
      {query.trim() && (
        <ul className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg">
          {results.length === 0 && <li className="px-4 py-3 text-sm text-neutral-500">{emptyMessage}</li>}
          {results.map((result) => (
            <li key={result.id}>
              <button
                type="button"
                onClick={() => onSelect(result)}
                className="flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left hover:bg-neutral-50"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-neutral-900">{result.title}</span>
                  <span className="block truncate text-xs text-neutral-500">{result.subtitle}</span>
                </span>
                <span className="hidden shrink-0 sm:block">{result.aside}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
