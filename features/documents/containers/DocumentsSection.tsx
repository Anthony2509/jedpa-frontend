"use client";

import { DOCUMENT_TYPE_LABELS, isMockParticipantId, useMacroRegions, type Participant } from "@/features/participants";
import { useResolution } from "@/features/resolutions";
import { formatDateTime } from "@/shared/lib/formatDate";
import { InlineError } from "@/shared/ui/InlineError";
import { DocumentList } from "../components/DocumentList";
import { DocumentPreviewModal } from "../components/DocumentPreviewModal";
import { ObserveDocumentModal } from "../components/ObserveDocumentModal";
import { OptionalDocuments } from "../components/OptionalDocuments";
import { buildDocumentRows, type DocumentRowModel } from "../domain/documentDisplay";
import { useDocumentReview } from "../hooks/useDocumentReview";

interface DocumentsSectionProps {
  participant: Participant;
}

function describeReview({ document, nextAction }: DocumentRowModel) {
  if (nextAction || !document.reviewedBy || !document.reviewedAt) return undefined;
  return `Revisado por ${document.reviewedBy} · ${formatDateTime(document.reviewedAt)}`;
}

export function DocumentsSection({ participant }: DocumentsSectionProps) {
  const review = useDocumentReview(participant);
  const mockResolution = useResolution(participant.delegation?.macro);
  const macroRegion = useMacroRegions().find((m) => m.id === participant.delegation?.macroRegionId);
  const resolutionAvailable = isMockParticipantId(participant.id) ? Boolean(mockResolution?.fileName) : Boolean(macroRegion?.hasResolution);
  const rows = buildDocumentRows(participant);
  const previewDocument = participant.documents.find((document) => document.type === review.previewing);

  const listProps = {
    describeReview,
    resolution: {
      macro: participant.delegation?.macro,
      available: resolutionAvailable,
      onConfirm: () => review.confirmResolution(mockResolution?.fileName ?? ""),
    },
    onUpload: review.upload,
    onView: review.openPreview,
    onApprove: review.approve,
    onObserve: review.startObserve,
  };

  return (
    <div aria-busy={review.busy}>
      <InlineError message={review.error} className="mb-2" />
      <div className="-my-4">
        <DocumentList rows={rows.required} {...listProps} />
      </div>
      <OptionalDocuments count={rows.optional.length}>
        <DocumentList rows={rows.optional} {...listProps} />
      </OptionalDocuments>
      <ObserveDocumentModal
        open={review.observing !== null}
        documentLabel={review.observing ? DOCUMENT_TYPE_LABELS[review.observing] : ""}
        observation={review.observation}
        onObservationChange={review.setObservation}
        onConfirm={review.confirmObserve}
        onClose={review.cancelObserve}
      />
      <DocumentPreviewModal
        open={review.previewing !== null}
        documentLabel={review.previewing ? DOCUMENT_TYPE_LABELS[review.previewing] : ""}
        fileName={previewDocument?.fileName}
        mimeType={previewDocument?.mimeType}
        url={review.link?.url}
        onClose={review.closePreview}
      />
    </div>
  );
}
