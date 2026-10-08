"use client";

import { useRouter } from "next/navigation";
import { WORK_QUEUES, WorkQueueView } from "@/features/participants";
import { formatDateTime } from "@/shared/lib/formatDate";
import { Button } from "@/shared/ui/Button";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Tabs } from "@/shared/ui/Tabs";
import { PrintedCredentialsTable } from "../components/PrintedCredentialsTable";
import { CREDENTIALS_VIEW_META, getCredentialPending } from "../domain/credentialsViews";
import { useCredentialsQueue } from "../hooks/useCredentialsQueue";
import type { CredentialsView } from "../types";

export function CredentialsQueueContainer() {
  const router = useRouter();
  const queue = useCredentialsQueue();
  const openRecord = (id: string) => router.push(`/participants/${id}?from=credentials`);
  const active = queue.view === "printed" ? null : CREDENTIALS_VIEW_META[queue.view];
  const rows = queue.view === "issue" ? queue.toIssue : queue.toPrint;

  return (
    <>
      <PageHeader
        eyebrow={`Paso ${WORK_QUEUES.credentials.step} de 4`}
        title="Credenciales"
        description="Primero se genera la credencial (código único y QR) y después se imprime. Imprimir no la marca como entregada."
        actions={
          active && (
            <Button variant="secondary" disabled={rows.length === 0} onClick={queue.view === "issue" ? queue.issueAll : queue.printAll}>
              {active.bulkLabel} ({rows.length})
            </Button>
          )
        }
      />
      <Tabs
        activeId={queue.view}
        onChange={(id) => queue.setView(id as CredentialsView)}
        tabs={[
          { id: "issue", label: "1. Por generar", count: queue.toIssue.length },
          { id: "print", label: "2. Por imprimir", count: queue.toPrint.length },
          { id: "printed", label: "Impresas", count: queue.printed.length },
        ]}
      />
      {active ? (
        <WorkQueueView
          participants={rows}
          pendingHeader={active.pendingHeader}
          getPending={queue.view === "issue" ? undefined : (p) => getCredentialPending(queue.view, p)}
          nextCtaLabel={active.nextCtaLabel}
          rowActionLabel={active.actionLabel}
          doneTitle={active.doneTitle}
          doneMessage={active.doneMessage}
          onAction={queue.view === "issue" ? queue.issue : queue.print}
          onOpen={(p) => openRecord(p.id)}
        />
      ) : (
        <PrintedCredentialsTable participants={queue.printed} formatDate={formatDateTime} onOpen={(p) => openRecord(p.id)} />
      )}
    </>
  );
}
