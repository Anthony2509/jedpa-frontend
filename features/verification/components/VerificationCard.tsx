import { BrandMark } from "@/shared/ui/BrandMark";
import type { VerificationView } from "../domain/verificationView";
import { VerificationDetails } from "./VerificationDetails";

interface VerificationCardProps {
  code: string;
  view: VerificationView | null;
}

export function VerificationCard({ code, view }: VerificationCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <BrandMark title="JEDPA 2026" subtitle="Verificación de credencial" />
      <p className="mt-6 break-all font-mono text-xs text-neutral-500">{code}</p>
      {!view ? (
        <p className="mt-2 text-lg font-semibold text-brand">Credencial no encontrada</p>
      ) : view.valid === false ? (
        // A copy replaced by a duplicate: the API returns no personal data.
        <p className="mt-2 text-lg font-semibold text-brand">{view.message}</p>
      ) : (
        <VerificationDetails view={view} />
      )}
    </div>
  );
}
