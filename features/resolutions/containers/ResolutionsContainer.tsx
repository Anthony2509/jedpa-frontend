"use client";

import { useMacroRegions } from "@/features/participants";
import { EmptyState } from "@/shared/ui/EmptyState";
import { InlineError } from "@/shared/ui/InlineError";
import { PageHeader } from "@/shared/ui/PageHeader";
import { ResolutionsTable } from "../components/ResolutionsTable";
import { useResolutionActions } from "../hooks/useResolutionActions";

export function ResolutionsContainer() {
  const regions = useMacroRegions();
  const actions = useResolutionActions();

  return (
    <>
      <PageHeader
        title="Resoluciones directorales"
        description="Se carga una resolución (PDF) por macrorregión. Después, en la ficha de cada participante solo se confirma que figura en la resolución de su macro."
      />
      <InlineError message={actions.error} className="mb-4" />
      {regions.length > 0 ? (
        <ResolutionsTable rows={regions} busyId={actions.busyId} onUpload={(row, file) => actions.upload(row.id, file)} onView={(row) => actions.view(row.id)} />
      ) : (
        <EmptyState message="Cargando macrorregiones…" />
      )}
    </>
  );
}
