"use client";

import { useRouter } from "next/navigation";
import { WORK_QUEUES, WorkQueueView, getReviewPending, getWorkQueue, useParticipants } from "@/features/participants";
import { PageHeader } from "@/shared/ui/PageHeader";

const META = WORK_QUEUES.review;

export function ReviewQueueContainer() {
  const router = useRouter();
  const queue = getWorkQueue("review", useParticipants());
  const openRecord = (id: string) => router.push(`/participants/${id}?from=review`);

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${META.step} de 4`}
        title="Revisión de documentos"
        description="Aprueba u observa los documentos de cada participante. Se atienden en orden de llegada."
      />
      <WorkQueueView
        participants={queue}
        pendingHeader="Por revisar"
        getPending={getReviewPending}
        nextCtaLabel="Revisar documentos"
        rowActionLabel="Revisar"
        mobileRowAction={false}
        doneTitle="No hay documentos por revisar"
        doneMessage="Cuando se carguen documentos nuevos aparecerán aquí, del más antiguo al más reciente."
        onAction={(p) => openRecord(p.id)}
        onOpen={(p) => openRecord(p.id)}
      />
    </>
  );
}
