import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import { BrandMark } from "@/shared/ui/BrandMark";
import type { VerificationView } from "../domain/verificationView";

interface VerificationCardProps {
  code: string;
  view: VerificationView | null;
}

export function VerificationCard({ code, view }: VerificationCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <BrandMark title="JEDPA 2026" subtitle="Verificación de credencial" />
      <p className="mt-6 font-mono text-xs text-neutral-500">{code}</p>
      {!view ? (
        <p className="mt-2 text-lg font-semibold text-brand">Credencial no encontrada</p>
      ) : (
        <>
          <h1 className="mt-1 text-xl font-semibold text-neutral-950">{view.fullName}</h1>
          <p className="text-sm text-neutral-500">{view.typeLabel} · {view.group}</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge tone={view.statusTone}>{view.statusLabel}</Badge>
            <span className="text-sm text-neutral-600">
              {view.documentsComplete ? "Documentación completa" : "Documentación incompleta"}
            </span>
          </div>
          <ul className="mt-5 divide-y divide-neutral-100 border-t border-neutral-100">
            {view.documents.map((document) => (
              <li key={document.label} className="flex items-center justify-between py-2.5 text-sm">
                <span className="flex items-center gap-2 text-neutral-800">
                  {document.ok ? <CheckCircle2 className="size-4 text-neutral-900" /> : <XCircle className="size-4 text-brand" />}
                  {document.label}
                </span>
                <span className="text-neutral-500">{document.statusLabel}</span>
              </li>
            ))}
            {view.documents.length === 0 && <li className="py-2.5 text-sm text-neutral-500">Credencial sin documentos obligatorios.</li>}
          </ul>
        </>
      )}
    </div>
  );
}
