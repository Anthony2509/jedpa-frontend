import { Suspense } from "react";
import { ParticipantRecordContainer } from "@/features/participant-record";

export default function ParticipantRecordPage() {
  return (
    <Suspense fallback={<p className="text-sm text-neutral-500">Cargando participante…</p>}>
      <ParticipantRecordContainer />
    </Suspense>
  );
}
