import { FileText } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import type { DocumentRowModel } from "../domain/documentDisplay";
import { DocumentRowActions } from "./DocumentRowActions";
import type { ResolutionActionProps } from "./ResolutionAction";

interface DocumentRowProps {
  row: DocumentRowModel;
  reviewMeta?: string;
  resolution: ResolutionActionProps;
  onUpload: (fileName: string) => void;
  onView: () => void;
  onApprove: () => void;
  onObserve: () => void;
}

export function DocumentRow({ row, reviewMeta, resolution, onUpload, onView, onApprove, onObserve }: DocumentRowProps) {
  const { document } = row;
  const needsAction = row.nextAction !== null;

  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <p className={cn("text-sm", needsAction ? "font-semibold text-neutral-950" : "text-neutral-600")}>{row.label}</p>
          <Badge tone={row.display.tone}>{row.display.label}</Badge>
        </div>
        {document.fileName && (
          <button type="button" onClick={onView} className="mt-1 inline-flex items-center gap-1.5 text-xs text-neutral-500 underline-offset-2 hover:text-neutral-900 hover:underline">
            <FileText className="size-3.5" /> {document.fileName}
          </button>
        )}
        {document.observation && <p className="mt-1 text-sm text-brand">{document.observation}</p>}
        {reviewMeta && !needsAction && <p className="mt-0.5 text-xs text-neutral-400">{reviewMeta}</p>}
      </div>
      {/* On phones the action spans the full width so it is easy to tap. */}
      <div className="[&>*]:w-full sm:[&>*]:w-auto [&>div>*]:flex-1 sm:[&>div>*]:flex-none">
        <DocumentRowActions
          nextAction={row.nextAction}
          hasFile={Boolean(document.fileName)}
          required={row.required}
          resolution={resolution}
          onUpload={onUpload}
          onApprove={onApprove}
          onObserve={onObserve}
        />
      </div>
    </li>
  );
}
