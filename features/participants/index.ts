export type {
  AccessLevel,
  Credential,
  CredentialCopy,
  DelegationInfo,
  Delivery,
  DocumentStatus,
  DocumentType,
  IdentityType,
  MacroId,
  Participant,
  ParticipantDocument,
  ParticipantStatus,
  ParticipantType,
  PendingSummary,
  SpecialDraft,
} from "./types";
export type { WorkQueueId, WorkQueueMeta } from "./domain/workQueues";
export type { DeliveryInput } from "./services/deliveriesApi";
export type { IdentityValues } from "./components/IdentityFields";

// Catalogs and pure rules
export { DOCUMENT_STATUS_META, DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, OPTIONAL_DOCUMENTS, REQUIRED_DOCUMENTS } from "./domain/documentTypes";
export {
  ACCESS_LABELS,
  DEFAULT_ACCESS,
  IDENTITY_TYPE_LABELS,
  PARTICIPANT_TYPES,
  PARTICIPANT_TYPE_LABELS,
  SPECIAL_TYPES,
  isSpecialType,
} from "./domain/participantTypes";
export { GENDER_LABELS, MACROS, buildDelegationCode, describeDiscipline } from "./domain/macros";
export { COPY_LABELS, MAX_COPIES, canPrintDuplicate, getCopyLabel, getLatestCopy, getNextCopyLabel } from "./domain/credentialCopies";
export {
  PARTICIPANT_STATUSES,
  PARTICIPANT_STATUS_META,
  countDocumentsToReview,
  getMissingRequirements,
  getOptionalDocuments,
  getParticipantStatus,
  getRequiredDocuments,
} from "./domain/participantStatus";
export { getDelegationCode, getFullName, getIdentityLabel, getParticipantContext } from "./domain/participantName";
export { matchesSearch } from "./domain/filterParticipants";
export { getCurrentPending, getRegistrationPending, getReviewPending } from "./domain/pendingLabels";
export { WORK_QUEUES, WORK_QUEUE_IDS, getWorkQueue, isInWorkQueue, parseWorkQueueId } from "./domain/workQueues";
export { validateSpecialDraft } from "./domain/validateParticipantDraft";

// Data access (mock API)
export { useParticipant, useParticipants } from "./hooks/useParticipants";
export { useParticipantFilters } from "./hooks/useParticipantFilters";
export { approveDocument, confirmInResolution, observeDocument, uploadDocument } from "./services/documentsApi";
export { issueCredential, printCredential, printDuplicate } from "./services/credentialsApi";
export { deliverCredential } from "./services/deliveriesApi";
export { convertToCompanion, createSpecialParticipant } from "./services/registrationApi";

// UI
export { IdentityFields } from "./components/IdentityFields";
export { ParticipantIdentity } from "./components/ParticipantIdentity";
export { ParticipantSummary } from "./components/ParticipantSummary";
export { ParticipantTypeCell } from "./components/ParticipantTypeCell";
export { PendingChips } from "./components/PendingChips";
export { ParticipantStatusBadge } from "./components/ParticipantStatusBadge";
export { ParticipantsFilters } from "./components/ParticipantsFilters";
export { WorkQueueView } from "./components/WorkQueueView";
export { ParticipantsDataProvider } from "./containers/ParticipantsDataProvider";
export { ParticipantsListContainer } from "./containers/ParticipantsListContainer";
export { RegistrationQueueContainer } from "./containers/RegistrationQueueContainer";
