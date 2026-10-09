"use client";

import { AUDIT_ACTION_LABELS, useAuditEntries } from "@/features/audit";
import { useCurrentUser, usePermission } from "@/features/auth";
import { WORK_QUEUES, WORK_QUEUE_IDS, useParticipants, useQueueCounts } from "@/features/participants";
import { MacroProgressTable, buildMacroProgress } from "@/features/reports";
import { formatDateTime } from "@/shared/lib/formatDate";
import { Card } from "@/shared/ui/Card";
import { MockDataNotice } from "@/shared/ui/MockDataNotice";
import { PageHeader } from "@/shared/ui/PageHeader";
import { Timeline } from "@/shared/ui/Timeline";
import { ProcessStepCard } from "../components/ProcessStepCard";
import { StatusOverview } from "../components/StatusOverview";
import { buildDashboardSummary } from "../domain/buildDashboardSummary";

export function DashboardContainer() {
  const participants = useParticipants();
  const summary = buildDashboardSummary(participants);
  // The four process cards use the real queues (same counters as the menu); the rest is still mock.
  const counts = useQueueCounts();
  const steps = WORK_QUEUE_IDS.map((id) => ({ ...WORK_QUEUES[id], count: counts?.[id] ?? 0 }));
  const recent = useAuditEntries().slice(0, 7);
  const firstName = useCurrentUser().name.split(" ")[0];
  const showReports = usePermission("reports_basic");

  return (
    <>
      <PageHeader title={`Hola, ${firstName}`} description="Esto es lo que hay pendiente, en el orden del proceso." />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {steps.map((step) => (
          <ProcessStepCard key={step.href} {...step} />
        ))}
      </div>
      <div className="mt-6">
        <MockDataNotice />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        {showReports && (
          <section className="xl:col-span-2">
            <h2 className="mb-3 text-[15px] font-semibold text-neutral-900">Avance por macrorregión</h2>
            <MacroProgressTable rows={buildMacroProgress(participants)} />
          </section>
        )}
        <Card title="Estado general">
          <StatusOverview total={summary.total} delivered={summary.delivered} byStatus={summary.byStatus} />
        </Card>
        {/* Without the macro table, activity takes its place next to the status card instead of leaving a gap. */}
        <Card title="Actividad reciente" className={showReports ? "xl:col-span-3" : "xl:col-span-2"}>
          <Timeline
            items={recent.map((entry) => ({
              id: entry.id,
              title: AUDIT_ACTION_LABELS[entry.action],
              description: entry.participantName,
              meta: `${entry.userName} · ${formatDateTime(entry.at)}`,
            }))}
          />
        </Card>
      </div>
    </>
  );
}
