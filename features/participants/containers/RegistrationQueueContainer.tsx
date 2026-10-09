"use client";

import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/features/auth";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { PageHeader } from "@/shared/ui/PageHeader";
import { ImportExcelModal } from "../components/ImportExcelModal";
import { ParticipantFormModal } from "../components/ParticipantFormModal";
import { WorkQueueView } from "../components/WorkQueueView";
import { WORK_QUEUES } from "../domain/workQueues";
import { useParticipantForm } from "../hooks/useParticipantForm";
import { useParticipantImport } from "../hooks/useParticipantImport";
import { useWorkQueueParticipants } from "../hooks/useWorkQueueParticipants";

const META = WORK_QUEUES.registration;

export function RegistrationQueueContainer() {
  const router = useRouter();
  const queue = useWorkQueueParticipants("registration");
  const canManage = usePermission("import_participants");
  const openRecord = (id: string) => router.push(`/participants/${id}?from=registration`);
  const form = useParticipantForm({ canCreateDelegation: usePermission("manage_delegations"), onCreated: (created) => openRecord(created.id) });
  const importer = useParticipantImport();

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${META.step} de 4`}
        title="Registro y documentos"
        description="Registra participantes y carga sus documentos. Los que tienen documentos observados vuelven a esta lista."
        actions={
          <>
            {canManage && <Button variant="secondary" icon={<Upload className="size-4" />} onClick={importer.openImport}>Importar Excel</Button>}
            <Button icon={<Plus className="size-4" />} onClick={form.openForm}>Nuevo participante</Button>
          </>
        }
      />
      {queue.data ? (
        <WorkQueueView
          participants={queue.data.participants}
          nextCtaLabel="Completar documentos"
          rowActionLabel="Completar"
          mobileRowAction={false}
          doneTitle="No hay documentos pendientes"
          doneMessage="Todos los participantes registrados tienen sus documentos cargados. Registra uno nuevo para continuar."
          onAction={(p) => openRecord(p.id)}
          onOpen={(p) => openRecord(p.id)}
        />
      ) : (
        <EmptyState message={queue.error ?? "Cargando la cola de registro…"} />
      )}
      <ParticipantFormModal
        open={form.open}
        draft={form.draft}
        error={form.error}
        submitting={form.submitting}
        macroOptions={form.macroOptions}
        sportOptions={form.sportOptions}
        delegationCode={form.delegationCode}
        onFieldChange={form.setField}
        onSubmit={form.submit}
        onClose={form.close}
      />
      <ImportExcelModal
        open={importer.open}
        fileName={importer.file?.name}
        preview={importer.preview}
        result={importer.result}
        error={importer.error}
        busy={importer.busy}
        onSelectFile={importer.selectFile}
        onConfirm={importer.confirm}
        onClose={importer.close}
      />
    </>
  );
}
