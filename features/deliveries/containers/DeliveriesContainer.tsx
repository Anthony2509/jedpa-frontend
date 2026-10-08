"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WORK_QUEUES, WorkQueueView, getCopyLabel, getLatestCopy, getParticipantStatus, getWorkQueue, useParticipants } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Tabs } from "@/shared/ui/Tabs";
import { DeliveredTable } from "../components/DeliveredTable";
import { useDeliveryForm } from "../hooks/useDeliveryForm";
import type { DeliveriesView } from "../types";
import { ConnectedDeliveryModal } from "./ConnectedDeliveryModal";

export function DeliveriesContainer() {
  const router = useRouter();
  const participants = useParticipants();
  const [view, setView] = useState<DeliveriesView>("pending");
  const form = useDeliveryForm();
  const openRecord = (id: string) => router.push(`/participants/${id}?from=delivery`);

  const pending = getWorkQueue("delivery", participants);
  const delivered = participants.filter((p) => getParticipantStatus(p) === "delivered");

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${WORK_QUEUES.delivery.step} de 4`}
        title="Entrega de credenciales"
        description="Registra cada entrega física. La fecha, la hora y el responsable se guardan automáticamente."
      />
      <Tabs
        activeId={view}
        onChange={(id) => setView(id as DeliveriesView)}
        tabs={[
          { id: "pending", label: "Por entregar", count: pending.length },
          { id: "delivered", label: "Entregadas", count: delivered.length },
        ]}
      />
      {view === "pending" ? (
        <WorkQueueView
          participants={pending}
          pendingHeader="Copia por entregar"
          getPending={(p) => { const copy = getLatestCopy(p); return copy ? { tone: "neutral", items: [getCopyLabel(copy)], code: p.credential?.code } : null; }}
          nextCtaLabel="Registrar entrega"
          rowActionLabel="Registrar entrega"
          mobileRowActionLabel="Entregar"
          doneTitle="No hay credenciales por entregar"
          doneMessage="Las credenciales aparecerán aquí cuando se impriman."
          onAction={(p) => form.open(p)}
          onOpen={(p) => openRecord(p.id)}
        />
      ) : (
        <DeliveredTable participants={delivered} formatDate={formatDateTime} onOpen={(p) => openRecord(p.id)} />
      )}
      <ConnectedDeliveryModal form={form} />
    </>
  );
}
