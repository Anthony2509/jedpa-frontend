import { Suspense } from "react";
import { ParticipantsListContainer } from "@/features/participants";

export default function ParticipantsPage() {
  return (
    <Suspense>
      <ParticipantsListContainer />
    </Suspense>
  );
}
