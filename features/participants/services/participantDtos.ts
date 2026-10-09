/** Shapes returned by the API (jedpa-backend, `docs/PROJECT_STATUS.md` §3). */
export interface ParticipantTypeDto {
  id: string;
  code: string;
  name: string;
  category: "REGULAR" | "SPECIAL";
  accessLevel: "TOTAL" | "PARTIAL" | null;
}

export interface ParticipantDto {
  id: string;
  documentType: "DNI" | "CE" | "PASAPORTE";
  documentNumber: string;
  firstNames: string;
  paternalLastName: string;
  maternalLastName: string | null;
  participantType: ParticipantTypeDto;
  institution: string | null;
  schoolName: string | null;
  status: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSpecialParticipantDto {
  documentType: ParticipantDto["documentType"];
  documentNumber: string;
  firstNames: string;
  paternalLastName: string;
  maternalLastName?: string;
  participantTypeId: string;
  institution: string;
}
