import { OPTIONAL_DOCUMENTS } from "../domain/documentTypes";
import type { Credential, CredentialCopy, Participant, ParticipantDocument } from "../types";
import { DOCUMENT_FROM_API, DOCUMENT_STATUS_FROM_API } from "./apiCodes";
import type { CredentialCopyDto, DocumentItemDto, ParticipantDto } from "./participantDtos";
import { toParticipant } from "./participantMapper";

/**
 * The API lists all 11 document types for everyone. The record shows the required ones, the
 * optional ones of the type (OPTIONAL_DOCUMENTS, until the backend seeds them) and any with a file.
 */
function toDocument(item: DocumentItemDto, optional: string[]): ParticipantDocument | null {
  const type = DOCUMENT_FROM_API[item.documentType.code];
  if (!type) return null;
  const tracked = item.required || optional.includes(type) || item.file;
  const status = DOCUMENT_STATUS_FROM_API[item.status] ?? "pending";
  return {
    type,
    required: item.required,
    status: tracked ? status : "not_applicable",
    fileName: item.file?.originalName,
    mimeType: item.file?.mimeType,
    observation: item.observation ?? undefined,
    reviewedBy: item.reviewedBy?.fullName,
    reviewedAt: item.reviewedAt ?? undefined,
  };
}

function toCopy(dto: CredentialCopyDto): CredentialCopy {
  return {
    id: dto.id,
    number: dto.copyNumber,
    printedAt: dto.printedAt,
    printedBy: dto.printedBy.fullName,
    reason: dto.reason ?? undefined,
    revoked: dto.isRevoked,
    verificationUrl: dto.verificationUrl,
  };
}

/** The API has no separate "issued" step: a credential exists once the original is printed. */
function toCredential(copies: CredentialCopyDto[]): Credential | undefined {
  if (copies.length === 0) return undefined;
  const sorted = [...copies].sort((a, b) => a.copyNumber - b.copyNumber).map(toCopy);
  const current = sorted.find((copy) => !copy.revoked) ?? sorted.at(-1)!;
  return {
    code: current.verificationUrl?.split("/").pop() ?? "",
    issuedAt: sorted[0].printedAt,
    issuedBy: sorted[0].printedBy,
    copies: sorted,
  };
}

export function toParticipantRecord(dto: ParticipantDto, documents: DocumentItemDto[], copies: CredentialCopyDto[]): Participant {
  const base = toParticipant(dto);
  const optional = OPTIONAL_DOCUMENTS[base.type];
  return {
    ...base,
    documents: documents.map((item) => toDocument(item, optional)).filter((d): d is ParticipantDocument => d !== null),
    credential: toCredential(copies),
  };
}
