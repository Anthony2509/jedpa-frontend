import { apiGet } from "@/shared/lib/apiClient";
import type { VerificationView } from "../domain/verificationView";

interface VerifyDto {
  valid: boolean;
  enabled: boolean;
  message: string;
  credential: string;
  participant: { fullName: string; participantType: string; delegation: string | null; institution: string | null } | null;
  documents: { name: string; status: string }[];
}

const DOCUMENT_STATUS_LABELS: Record<string, string> = {
  APPROVED: "Aprobado",
  OBSERVED: "Observado",
  PENDING: "Pendiente",
  NOT_APPLICABLE: "No aplica",
};

const isOk = (status: string) => status === "APPROVED" || status === "NOT_APPLICABLE";

/** Public endpoint: never returns the document number, photo or files. */
export async function fetchVerification(token: string): Promise<VerificationView> {
  const dto = await apiGet<VerifyDto>(`/verify/${encodeURIComponent(token)}`);
  return {
    fullName: dto.participant?.fullName ?? "",
    typeLabel: dto.participant?.participantType ?? "",
    group: dto.participant?.delegation ?? dto.participant?.institution ?? "",
    statusLabel: dto.enabled ? "Habilitado" : "No habilitado",
    statusTone: dto.enabled ? "muted" : "brand",
    documentsComplete: dto.documents.every((d) => isOk(d.status)),
    documents: dto.documents.map((d) => ({ label: d.name, statusLabel: DOCUMENT_STATUS_LABELS[d.status] ?? d.status, ok: isOk(d.status) })),
    message: dto.message,
    copyLabel: dto.credential,
    valid: dto.valid,
  };
}
