"use client";

import { useRouter } from "next/navigation";
import { WORK_QUEUES, WorkQueueView, useWorkQueueParticipants } from "@/features/participants";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";

const META = WORK_QUEUES.review;

export function ReviewQueueContainer() {
  const router = useRouter();
  const queue = useWorkQueueParticipants("review");
  const openRecord = (id: string) => router.push(`/participants/${id}?from=review`);

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${META.step} de 4`}
        title={META.label}
        description="Aprueba u observa los documentos de cada participante. Se atienden en orden de llegada."
      />
      {queue.data ? (
        <WorkQueueView
          participants={queue.data.participants}
          nextCtaLabel="Revisar documentos"
          rowActionLabel="Revisar"
          mobileRowAction={false}
          doneTitle="No hay documentos por revisar"
          doneMessage="Aparecen aquí los participantes con todos sus documentos obligatorios cargados. Los que tienen alguno pendiente se pueden revisar desde Registro."
          onAction={(p) => openRecord(p.id)}
          onOpen={(p) => openRecord(p.id)}
        />
      ) : (
        <EmptyState message={queue.error ?? "Cargando la cola de revisión…"} />
      )}
    </>
  );
}
