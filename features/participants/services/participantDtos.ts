/** Shapes returned by the API (jedpa-backend, docs/SPEC.md §13-14). */
export interface ParticipantTypeDto {
  id: string;
  code: string;
  name: string;
  category: "REGULAR" | "SPECIAL";
  accessLevel: "TOTAL" | "PARTIAL" | null;
}

export interface CatalogItemDto {
  id: string;
  code: string;
  name: string;
}

export interface MacroRegionDto extends CatalogItemDto {
  resolutionFileId: string | null;
}

export interface DelegationDto {
  id: string;
  code: string;
  category: string;
  gender: "D" | "V";
  macroRegion: MacroRegionDto;
  sport: CatalogItemDto;
}

export interface ParticipantDto {
  id: string;
  documentType: "DNI" | "CE" | "PASAPORTE";
  documentNumber: string;
  firstNames: string;
  paternalLastName: string;
  maternalLastName: string | null;
  gender: "FEMALE" | "MALE" | null;
  birthDate: string | null;
  participantTypeId: string;
  participantType: ParticipantTypeDto;
  delegation: DelegationDto | null;
  institution: string | null;
  schoolName: string | null;
  region: string | null;
  status: string;
  isActive: boolean;
  createdAt: string;
}

export interface DocumentItemDto {
  id: string | null;
  documentType: { code: string; name: string };
  required: boolean;
  status: string;
  observation: string | null;
  file: { originalName: string; mimeType: string; uploadedAt: string } | null;
  reviewedBy: { fullName: string } | null;
  reviewedAt: string | null;
}

export interface DocumentChecklistDto {
  participantId: string;
  documents: DocumentItemDto[];
}

export interface CredentialCopyDto {
  id: string;
  copyNumber: number;
  printedAt: string;
  printedBy: { fullName: string };
  reason: string | null;
  isRevoked: boolean;
  verificationUrl: string;
}
