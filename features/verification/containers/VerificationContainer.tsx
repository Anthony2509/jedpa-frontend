"use client";

import { useParams } from "next/navigation";
import { useParticipants } from "@/features/participants";
import { useApiQuery } from "@/shared/lib/useApiQuery";
import { VerificationCard } from "../components/VerificationCard";
import { buildVerificationView } from "../domain/verificationView";
import { fetchVerification } from "../services/verifyApi";

/** TEMP: mock credentials keep their "JEDPA-2026-0001" codes; real ones carry the API token. */
const isMockCode = (token: string) => token.startsWith("JEDPA-");

export function VerificationContainer() {
  const { token } = useParams<{ token: string }>();
  const mock = isMockCode(token);
  const mockParticipant = useParticipants().find((p) => p.credential?.code === token);
  const api = useApiQuery(mock ? null : `verify:${token}`, () => fetchVerification(token));

  if (!mock && api.loading) return <p className="text-sm text-neutral-500">Verificando credencial…</p>;
  const view = mock ? (mockParticipant ? buildVerificationView(mockParticipant) : null) : (api.data ?? null);
  return <VerificationCard code={token} view={view} />;
}
