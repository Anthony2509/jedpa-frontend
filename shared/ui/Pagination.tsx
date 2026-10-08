import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, total, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
      <span>
        Página {page} de {pageCount} · {total} registros
      </span>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="secondary" size="sm" disabled={page === pageCount} onClick={() => onChange(page + 1)} aria-label="Página siguiente">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
