"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WORK_QUEUES, WorkQueueView, useParticipantsByStatus, useWorkQueueParticipants } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Tabs } from "@/shared/ui/Tabs";
import { DeliveredTable } from "../components/DeliveredTable";
import type { DeliveriesView } from "../types";

/**
 * TEMP(backend): the lists come from the API, but registering a delivery waits for its module.
 * Each row opens the record, where the printed copies are listed.
 */
export function DeliveriesContainer() {
  const router = useRouter();
  const [view, setView] = useState<DeliveriesView>("pending");
  const pending = useWorkQueueParticipants("delivery");
  const delivered = useParticipantsByStatus(["delivered"]);
  const openRecord = (id: string) => router.push(`/participants/${id}?from=delivery`);
  const active = view === "pending" ? pending : delivered;

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${WORK_QUEUES.delivery.step} de 4`}
        title={WORK_QUEUES.delivery.label}
        description="Credenciales impresas pendientes de entrega. El registro de la entrega estará disponible cuando el backend tenga ese módulo."
      />
      <Tabs
        activeId={view}
        onChange={(id) => setView(id as DeliveriesView)}
        tabs={[
          { id: "pending", label: "Por entregar", count: pending.data?.participants.length ?? 0 },
          { id: "delivered", label: "Entregadas", count: delivered.data?.participants.length ?? 0 },
        ]}
      />
      {!active.data ? (
        <EmptyState message={active.error ?? "Cargando credenciales…"} />
      ) : view === "pending" ? (
        <WorkQueueView
          participants={active.data.participants}
          nextCtaLabel="Ver copias impresas"
          rowActionLabel="Ver ficha"
          mobileRowAction={false}
          doneTitle="No hay credenciales por entregar"
          doneMessage="Las credenciales aparecerán aquí cuando se impriman."
          onAction={(p) => openRecord(p.id)}
          onOpen={(p) => openRecord(p.id)}
        />
      ) : (
        <DeliveredTable participants={active.data.participants} formatDate={formatDateTime} onOpen={(p) => openRecord(p.id)} />
      )}
    </>
  );
}
