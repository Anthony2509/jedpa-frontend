"use client";

import { useRouter } from "next/navigation";
import { usePermission } from "@/features/auth";
import { WORK_QUEUES, WorkQueueView } from "@/features/participants";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/shared/ui/EmptyState";
import { InlineError } from "@/shared/ui/InlineError";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Tabs } from "@/shared/ui/Tabs";
import { PrintedCredentialsTable } from "../components/PrintedCredentialsTable";
import { PRINT_BATCH_SIZE, PRINT_VIEW_META } from "../domain/credentialsViews";
import { useCredentialsQueue } from "../hooks/useCredentialsQueue";
import type { CredentialsView } from "../types";

export function CredentialsQueueContainer() {
  const router = useRouter();
  const queue = useCredentialsQueue();
  const canCalibrate = usePermission("calibrate_printer");
  const openRecord = (id: string) => router.push(`/participants/${id}?from=credentials`);
  const pending = queue.toPrint?.length ?? 0;

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${WORK_QUEUES.credentials.step} de 4`}
        title={WORK_QUEUES.credentials.label}
        description="Imprimir registra el ejemplar con su QR y abre el PDF para la impresora. Imprimir no la marca como entregada."
        actions={
          <>
            {canCalibrate && <Button variant="ghost" disabled={queue.busy} onClick={queue.testSheet}>Hoja de calibración</Button>}
            {queue.view === "print" && (
              <Button variant="secondary" disabled={pending === 0 || queue.busy} onClick={queue.printAll}>
                {PRINT_VIEW_META.bulkLabel} ({Math.min(pending, PRINT_BATCH_SIZE)})
              </Button>
            )}
          </>
        }
      />
      <InlineError message={queue.error} className="mb-4" />
      {queue.notice && <p className="mb-4 text-sm text-neutral-600">{queue.notice}</p>}
      <Tabs
        activeId={queue.view}
        onChange={(id) => queue.setView(id as CredentialsView)}
        tabs={[
          { id: "print", label: "Por imprimir", count: pending },
          { id: "printed", label: "Impresas", count: queue.printed?.length ?? 0 },
        ]}
      />
      {queue.view === "print" ? (
        queue.toPrint ? (
          <WorkQueueView
            participants={queue.toPrint}
            nextCtaLabel={PRINT_VIEW_META.nextCtaLabel}
            rowActionLabel={PRINT_VIEW_META.actionLabel}
            doneTitle={PRINT_VIEW_META.doneTitle}
            doneMessage={PRINT_VIEW_META.doneMessage}
            onAction={queue.print}
            onOpen={(p) => openRecord(p.id)}
          />
        ) : (
          <EmptyState message={queue.toPrintError ?? "Cargando credenciales por imprimir…"} />
        )
      ) : queue.printed ? (
        <PrintedCredentialsTable participants={queue.printed} onOpen={(p) => openRecord(p.id)} />
      ) : (
        <EmptyState message={queue.printedError ?? "Cargando credenciales impresas…"} />
      )}
    </>
  );
}
