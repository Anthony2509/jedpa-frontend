import { ExternalLink, FileText } from "lucide-react";

/** Placeholder for a file that is not shown inline, with an optional link to open it. */
export function FileBox({ message, url }: { message: string; url?: string }) {
  return (
    <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-md border border-dashed border-neutral-300 bg-neutral-50 px-6 text-center text-neutral-500">
      <FileText className="size-10 text-neutral-400" />
      <p className="text-sm">{message}</p>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-700">
          <ExternalLink className="size-4" /> Abrir PDF
        </a>
      )}
    </div>
  );
}
