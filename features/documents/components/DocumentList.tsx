import type { DocumentType } from "@/features/participants";
import type { DocumentRowModel } from "../domain/documentDisplay";
import { DocumentRow } from "./DocumentRow";
import type { ResolutionActionProps } from "./ResolutionAction";

export interface DocumentListHandlers {
  onUpload: (type: DocumentType, file: File) => void;
  onView: (type: DocumentType) => void;
  onApprove: (type: DocumentType) => void;
  onObserve: (type: DocumentType) => void;
}

interface DocumentListProps extends DocumentListHandlers {
  rows: DocumentRowModel[];
  resolution: ResolutionActionProps;
  describeReview: (row: DocumentRowModel) => string | undefined;
}

export function DocumentList({ rows, resolution, describeReview, ...handlers }: DocumentListProps) {
  return (
    <ul className="divide-y divide-neutral-100">
      {rows.map((row) => {
        const type = row.document.type;
        return (
          <DocumentRow
            key={type}
            row={row}
            reviewMeta={describeReview(row)}
            resolution={resolution}
            onUpload={(file) => handlers.onUpload(type, file)}
            onView={() => handlers.onView(type)}
            onApprove={() => handlers.onApprove(type)}
            onObserve={() => handlers.onObserve(type)}
          />
        );
      })}
    </ul>
  );
}
