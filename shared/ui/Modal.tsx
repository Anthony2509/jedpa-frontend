import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  footer?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, description, footer, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-xl bg-white shadow-xl sm:max-h-[85vh] sm:rounded-lg"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-neutral-500">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="-m-2 p-2 text-neutral-400 hover:text-neutral-900">
            <X className="size-5" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">{children}</div>
        {footer && (
          <footer className="flex shrink-0 flex-col-reverse gap-2 border-t border-neutral-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:justify-end sm:px-5 [&>*]:w-full sm:[&>*]:w-auto">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}
