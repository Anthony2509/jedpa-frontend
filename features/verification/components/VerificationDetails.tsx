import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";
import type { VerificationView } from "../domain/verificationView";

export function VerificationDetails({ view }: { view: VerificationView }) {
  return (
    <>
      <h1 className="mt-1 text-xl font-semibold text-neutral-950">{view.fullName}</h1>
      <p className="text-sm text-neutral-500">{[view.typeLabel, view.group, view.copyLabel].filter(Boolean).join(" · ")}</p>
      <div className="mt-4 flex items-center gap-2">
        <Badge tone={view.statusTone}>{view.statusLabel}</Badge>
        <span className="text-sm text-neutral-600">{view.documentsComplete ? "Documentación completa" : "Documentación incompleta"}</span>
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
  );
}
