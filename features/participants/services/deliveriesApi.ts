import { getCopyLabel } from "../domain/credentialCopies";
import { auditParticipantChange, currentActor } from "./auditContext";
import { updateParticipant } from "./participantsStore";

export interface DeliveryInput {
  copyNumber: number;
  place: { id: string; name: string };
  observation: string;
}

/** Registers the physical delivery of one printed copy (original or duplicate). */
export async function deliverCredential(participantId: string, input: DeliveryInput): Promise<void> {
  const delivery = { placeId: input.place.id, placeName: input.place.name, observation: input.observation || undefined, ...currentActor() };
  const updated = updateParticipant(participantId, (participant) => {
    const credential = participant.credential;
    if (!credential) throw new Error("La credencial no existe.");
    const copies = credential.copies.map((copy) => (copy.number === input.copyNumber ? { ...copy, delivery } : copy));
    return { ...participant, credential: { ...credential, copies } };
  });
  auditParticipantChange(updated, {
    action: "credential_delivered",
    field: getCopyLabel({ number: input.copyNumber }),
    before: "Impresa",
    after: "Entregada",
    detail: [`Lugar: ${input.place.name}`, input.observation].filter(Boolean).join(" · "),
  });
}
