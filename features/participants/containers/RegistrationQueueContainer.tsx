"use client";

import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { ParticipantFormModal } from "../components/ParticipantFormModal";
import { WorkQueueView } from "../components/WorkQueueView";
import { getRegistrationPending } from "../domain/pendingLabels";
import { WORK_QUEUES, getWorkQueue } from "../domain/workQueues";
import { useParticipantForm } from "../hooks/useParticipantForm";
import { useParticipants } from "../hooks/useParticipants";

const META = WORK_QUEUES.registration;

export function RegistrationQueueContainer() {
  const router = useRouter();
  const participants = useParticipants();
  const queue = getWorkQueue("registration", participants);
  const openRecord = (id: string) => router.push(`/participants/${id}?from=registration`);
  const form = useParticipantForm((created) => openRecord(created.id));

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${META.step} de 4`}
        title="Registro y documentos"
        description="Registra participantes y carga sus documentos. Los que tienen documentos observados vuelven a esta lista."
        actions={
          <>
            <Button variant="secondary" icon={<Upload className="size-4" />} disabled title="Pendiente de aprobación">
              Importar Excel
            </Button>
            <Button icon={<Plus className="size-4" />} onClick={form.openForm}>Nuevo participante</Button>
          </>
        }
      />
      <WorkQueueView
        participants={queue}
        pendingHeader="Pendiente"
        getPending={getRegistrationPending}
        nextCtaLabel="Completar documentos"
        rowActionLabel="Completar"
        mobileRowAction={false}
        doneTitle="No hay documentos pendientes"
        doneMessage="Todos los participantes registrados tienen sus documentos cargados. Registra uno nuevo para continuar."
        onAction={(p) => openRecord(p.id)}
        onOpen={(p) => openRecord(p.id)}
      />
      <ParticipantFormModal
        open={form.open}
        draft={form.draft}
        error={form.error}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
    </>
  );
}
