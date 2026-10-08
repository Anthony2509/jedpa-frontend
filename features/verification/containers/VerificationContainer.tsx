"use client";

import { useParams } from "next/navigation";
import { useParticipants } from "@/features/participants";
import { VerificationCard } from "../components/VerificationCard";
import { buildVerificationView } from "../domain/verificationView";

export function VerificationContainer() {
  const { code } = useParams<{ code: string }>();
  const participant = useParticipants().find((p) => p.credential?.code === code);
  return <VerificationCard code={code} view={participant ? buildVerificationView(participant) : null} />;
}
