import type { ReactNode } from "react";
import { User } from "lucide-react";
import type { CredentialCardData } from "../types";
import { QrPlaceholder } from "./QrPlaceholder";

interface CredentialCardProps {
  data: CredentialCardData;
  draft?: boolean;
}

function Side({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="shrink-0">
      <div className="relative aspect-[120/155] w-56 overflow-hidden rounded-lg border border-dashed border-neutral-400 bg-white p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-xs text-neutral-500">{title}</figcaption>
    </figure>
  );
}

/** Preview of what the inkjet prints over the pre-printed card (120 × 155 mm). */
export function CredentialCard({ data, draft }: CredentialCardProps) {
  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:gap-6 sm:overflow-visible">
      <Side title={`Frente · ${data.typeLabel}`}>
        <div className="ml-auto flex h-24 w-20 items-center justify-center bg-neutral-100 text-neutral-400"><User className="size-7" /></div>
        <p className="mt-4 text-center text-[11px] font-bold leading-tight text-neutral-900">{data.fullName}</p>
        <p className="mt-1 text-center text-[10px] text-neutral-700">{data.identity}</p>
        <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[9px]">
          {data.fields.map((field) => (
            <div key={field.label}>
              <dt className="text-neutral-400">{field.label}</dt>
              <dd className="font-medium text-neutral-800">{field.value}</dd>
            </div>
          ))}
        </dl>
        {data.accessLabel && <p className="absolute bottom-3 left-4 text-[10px] font-bold text-neutral-900">{data.accessLabel}</p>}
        {draft && <span className="absolute inset-0 flex -rotate-12 items-center justify-center text-2xl font-bold text-neutral-900/10">VISTA PREVIA</span>}
      </Side>
      <Side title="Reverso · QR">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <QrPlaceholder cells={data.qrCells} size={110} />
          <span className="font-mono text-[10px] text-neutral-500">{data.code}</span>
        </div>
      </Side>
    </div>
  );
}
