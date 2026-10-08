import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface OptionalDocumentsProps {
  count: number;
  children: ReactNode;
}

/** Collapsed by default: optional documents never block printing, so they stay out of the way. */
export function OptionalDocuments({ count, children }: OptionalDocumentsProps) {
  if (count === 0) return null;
  return (
    <details className="group mt-4 rounded-lg bg-neutral-50 px-4">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm text-neutral-600">
        <span>
          Documentos opcionales ({count}) <span className="text-neutral-400">· no bloquean la impresión</span>
        </span>
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-2">{children}</div>
    </details>
  );
}
