import { Search } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { INPUT_CLASSES } from "./inputClasses";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, placeholder = "Buscar…", onChange }: SearchInputProps) {
  return (
    <div className="relative min-w-0 flex-1 sm:min-w-64">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(INPUT_CLASSES, "h-10 pl-9")}
      />
    </div>
  );
}
