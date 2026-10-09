import { apiGet, type Paginated, type QueryParams } from "@/shared/lib/apiClient";
import { toAuditAction, type AuditChanges } from "../domain/apiAuditMapping";
import { describeApiChanges } from "../domain/describeApiChanges";
import type { AuditEntry } from "../types";

interface AuditLogDto {
  id: string;
  user: { fullName: string } | null;
  action: string;
  entity: string;
  participantId: string | null;
  changes: AuditChanges | null;
  createdAt: string;
}

interface NameDto {
  firstNames: string;
  paternalLastName: string;
  maternalLastName: string | null;
}

export const AUDIT_QUERY = "audit-logs";

const ENTITY_LABELS: Record<string, string> = {
  User: "Usuario",
  DeliveryPlace: "Lugar de entrega",
  Delegation: "Delegación",
  MacroRegion: "Resolución directoral",
  CredentialCopy: "Credencial",
};

/**
 * TEMP(backend): /audit-logs does not return the participant's name. It is looked up once per id
 * (at most one page of distinct ids) and kept for the session.
 */
const names = new Map<string, string>();

async function loadNames(ids: string[]): Promise<void> {
  const missing = [...new Set(ids)].filter((id) => !names.has(id));
  await Promise.all(
    missing.map(async (id) => {
      try {
        const p = await apiGet<NameDto>(`/participants/${id}`);
        names.set(id, [p.firstNames, p.paternalLastName, p.maternalLastName].filter(Boolean).join(" "));
      } catch {
        names.set(id, "Participante");
      }
    }),
  );
}

function toEntry(log: AuditLogDto): AuditEntry {
  const participantName = log.participantId ? (names.get(log.participantId) ?? "Participante") : (ENTITY_LABELS[log.entity] ?? log.entity);
  return {
    id: log.id,
    at: log.createdAt,
    userName: log.user?.fullName ?? "Sistema",
    action: toAuditAction(log.action, log.entity, log.changes ?? {}),
    participantId: log.participantId ?? "",
    participantName,
    entity: log.entity,
    detail: describeApiChanges(log.changes),
  };
}

export async function fetchAuditPage(params: QueryParams): Promise<Paginated<AuditEntry>> {
  const page = await apiGet<Paginated<AuditLogDto>>("/audit-logs", params);
  await loadNames(page.data.flatMap((log) => (log.participantId ? [log.participantId] : [])));
  return { ...page, data: page.data.map(toEntry) };
}
