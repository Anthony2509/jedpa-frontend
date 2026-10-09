export type AuditAction =
  | "participant_created"
  | "participant_updated"
  | "document_uploaded"
  | "document_approved"
  | "document_observed"
  | "credential_issued"
  | "credential_printed"
  | "credential_reprinted"
  | "credential_delivered"
  // Only from the API:
  | "document_reviewed"
  | "document_review_undone"
  | "pdf_downloaded"
  | "status_changed"
  | "file_accessed"
  | "imported"
  | "activated"
  | "deactivated"
  | "record_created"
  | "record_updated";

export interface AuditEntry {
  id: string;
  at: string;
  userName: string;
  action: AuditAction;
  participantId: string;
  participantName: string;
  /** API: what was touched when it is not a participant (User, DeliveryPlace…). */
  entity?: string;
  field?: string;
  before?: string;
  after?: string;
  detail?: string;
}

export type NewAuditEntry = Omit<AuditEntry, "id">;

/** API filters: they go to GET /audit-logs as is. Dates are AAAA-MM-DD (Peru time). */
export interface AuditApiFilters {
  userId: string;
  action: string;
  from: string;
  to: string;
}
