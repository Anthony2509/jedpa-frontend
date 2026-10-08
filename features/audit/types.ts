export type AuditAction =
  | "participant_created"
  | "participant_updated"
  | "document_uploaded"
  | "document_approved"
  | "document_observed"
  | "credential_issued"
  | "credential_printed"
  | "credential_reprinted"
  | "credential_delivered";

export interface AuditEntry {
  id: string;
  at: string;
  userName: string;
  action: AuditAction;
  participantId: string;
  participantName: string;
  field?: string;
  before?: string;
  after?: string;
  detail?: string;
}

export type NewAuditEntry = Omit<AuditEntry, "id">;

export interface AuditFilters {
  search: string;
  userName: string;
  action: string;
}
