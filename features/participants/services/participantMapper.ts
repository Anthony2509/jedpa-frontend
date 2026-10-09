import type { AccessLevel, DelegationInfo, MacroId, Participant, ParticipantTypeInfo } from "../types";
import { GENDER_FROM_API, IDENTITY_FROM_API, STATUS_FROM_API, TYPE_FROM_API } from "./apiCodes";
import type { DelegationDto, ParticipantDto, ParticipantTypeDto } from "./participantDtos";

const accessFromApi = (level: ParticipantTypeDto["accessLevel"]): AccessLevel | undefined =>
  level === "TOTAL" ? "total" : level === "PARTIAL" ? "partial" : undefined;

/** Unknown codes (a type added later in the catalog) fall back to guest so the UI still renders. */
export function toParticipantTypeInfo(dto: ParticipantTypeDto): ParticipantTypeInfo {
  return { id: dto.id, type: TYPE_FROM_API[dto.code] ?? "guest", special: dto.category === "SPECIAL", access: accessFromApi(dto.accessLevel) };
}

function toDelegationInfo(dto: DelegationDto, region: string | null): DelegationInfo {
  return {
    macro: dto.macroRegion.code as MacroId,
    region: region ?? "",
    sport: dto.sport.name,
    sportCode: dto.sport.code,
    category: dto.category,
    gender: dto.gender,
    delegationId: dto.id,
    macroRegionId: dto.macroRegion.id,
  };
}

/** List row. Documents and copies are loaded only for the record (see recordMapper). */
export function toParticipant(dto: ParticipantDto): Participant {
  return {
    id: dto.id,
    idType: IDENTITY_FROM_API[dto.documentType],
    idNumber: dto.documentNumber,
    firstName: dto.firstNames,
    lastName: [dto.paternalLastName, dto.maternalLastName].filter(Boolean).join(" "),
    type: toParticipantTypeInfo(dto.participantType).type,
    school: dto.schoolName ?? undefined,
    delegation: dto.delegation ? toDelegationInfo(dto.delegation, dto.region) : undefined,
    institution: dto.institution ?? undefined,
    access: accessFromApi(dto.participantType.accessLevel),
    documents: [],
    status: STATUS_FROM_API[dto.status],
    api: {
      participantTypeId: dto.participantTypeId,
      paternalLastName: dto.paternalLastName,
      maternalLastName: dto.maternalLastName,
      birthDate: dto.birthDate,
      gender: dto.gender ? GENDER_FROM_API[dto.gender] : null,
      region: dto.region,
      schoolName: dto.schoolName,
      isActive: dto.isActive,
    },
    createdAt: dto.createdAt,
  };
}
