import type { AccessLevel, IdentityType, Participant, ParticipantStatus, ParticipantType, ParticipantTypeInfo, SpecialDraft } from "../types";
import type { CreateSpecialParticipantDto, ParticipantDto, ParticipantTypeDto } from "./participantDtos";

const TYPE_FROM_API: Record<string, ParticipantType> = {
  DEPORTISTA: "athlete",
  ACOMPANANTE: "companion",
  DELEGADO: "delegate",
  ENTRENADOR: "coach",
  MINEDU: "minedu",
  INVITADO: "guest",
  PROVEEDOR_TOTAL: "supplier_full",
  PROVEEDOR_PARCIAL: "supplier_partial",
};

const IDENTITY_FROM_API: Record<ParticipantDto["documentType"], IdentityType> = { DNI: "dni", CE: "ce", PASAPORTE: "passport" };
const IDENTITY_TO_API: Record<IdentityType, ParticipantDto["documentType"]> = { dni: "DNI", ce: "CE", passport: "PASAPORTE" };

/** The API has no "issued" step yet (backend status §5, point 6). */
const STATUS_FROM_API: Record<string, ParticipantStatus> = {
  PENDING_DOCUMENTS: "pending_documents",
  IN_REVIEW: "in_review",
  OBSERVED: "observed",
  READY_TO_PRINT: "ready_to_print",
  PRINTED: "printed",
  DELIVERED: "delivered",
};

const accessFromApi = (level: ParticipantTypeDto["accessLevel"]): AccessLevel | undefined =>
  level === "TOTAL" ? "total" : level === "PARTIAL" ? "partial" : undefined;

/** Unknown codes (a type added later in the catalog) fall back to guest so the UI still renders. */
export function toParticipantTypeInfo(dto: ParticipantTypeDto): ParticipantTypeInfo {
  return { id: dto.id, type: TYPE_FROM_API[dto.code] ?? "guest", special: dto.category === "SPECIAL", access: accessFromApi(dto.accessLevel) };
}

/** Only the fields the connected screens use; documents and credential still come from mocks. */
export function toParticipant(dto: ParticipantDto): Participant {
  return {
    id: dto.id,
    idType: IDENTITY_FROM_API[dto.documentType],
    idNumber: dto.documentNumber,
    firstName: dto.firstNames,
    lastName: [dto.paternalLastName, dto.maternalLastName].filter(Boolean).join(" "),
    type: toParticipantTypeInfo(dto.participantType).type,
    school: dto.schoolName ?? undefined,
    institution: dto.institution ?? undefined,
    access: accessFromApi(dto.participantType.accessLevel),
    documents: [],
    status: STATUS_FROM_API[dto.status],
    createdAt: dto.createdAt,
  };
}

export function toCreateSpecialDto(draft: SpecialDraft, participantTypeId: string): CreateSpecialParticipantDto {
  const maternalLastName = draft.maternalLastName.trim();
  return {
    documentType: IDENTITY_TO_API[draft.idType],
    documentNumber: draft.idNumber.trim(),
    firstNames: draft.firstName.trim(),
    paternalLastName: draft.paternalLastName.trim(),
    ...(maternalLastName ? { maternalLastName } : {}),
    participantTypeId,
    institution: draft.institution.trim(),
  };
}
