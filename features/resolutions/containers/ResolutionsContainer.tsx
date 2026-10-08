"use client";

import { useParticipants } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { PageHeader } from "@/shared/ui/PageHeader";
import { ResolutionsTable } from "../components/ResolutionsTable";
import { countPendingConfirmations } from "../domain/resolutionProgress";
import { useResolutions } from "../hooks/useResolutions";
import { uploadResolution } from "../services/resolutionsApi";

export function ResolutionsContainer() {
  const participants = useParticipants();
  const rows = useResolutions().map((resolution) => ({
    ...resolution,
    pendingConfirmations: countPendingConfirmations(participants, resolution.macro),
  }));

  return (
    <>
      <PageHeader
        title="Resoluciones directorales"
        description="Se carga una resolución por macrorregión. Después, en cada participante solo se confirma que figura en la resolución de su macro."
      />
      <ResolutionsTable rows={rows} formatDate={formatDateTime} onUpload={(row, fileName) => uploadResolution(row.macro, fileName)} />
    </>
  );
}
