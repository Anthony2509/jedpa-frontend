import { PackageCheck, Printer } from "lucide-react";
import { Button } from "@/shared/ui/Button";

interface DelegationActionsProps {
  readyToPrint: number;
  toDeliver: number;
  pendingDocuments: number;
  onPrintReady: () => void;
  onDeliverAll: () => void;
}

/** Group work for the delegation. The first available action is the highlighted one. */
export function DelegationActions({ readyToPrint, toDeliver, pendingDocuments, onPrintReady, onDeliverAll }: DelegationActionsProps) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mb-8 xl:grid-cols-3">
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:col-span-2 sm:p-5 xl:col-span-1">
        <p className="text-sm text-neutral-600">Con documentos pendientes</p>
        <p className="mt-1 text-2xl font-semibold sm:mt-2 sm:text-3xl tabular-nums text-neutral-950">{pendingDocuments}</p>
        <p className="mt-1 text-xs text-neutral-500">Se completan desde la ficha de cada integrante.</p>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
        <p className="text-sm text-neutral-600">Credenciales listas para imprimir</p>
        <p className="mt-1 text-2xl font-semibold sm:mt-2 sm:text-3xl tabular-nums text-neutral-950">{readyToPrint}</p>
        <Button className="mt-3 w-full" variant={readyToPrint ? "brand" : "secondary"} disabled={!readyToPrint} icon={<Printer className="size-4" />} onClick={onPrintReady}>
          Generar e imprimir ({readyToPrint})
        </Button>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5">
        <p className="text-sm text-neutral-600">Impresas por entregar</p>
        <p className="mt-1 text-2xl font-semibold sm:mt-2 sm:text-3xl tabular-nums text-neutral-950">{toDeliver}</p>
        <Button className="mt-3 w-full" variant={!readyToPrint && toDeliver ? "brand" : "secondary"} disabled={!toDeliver} icon={<PackageCheck className="size-4" />} onClick={onDeliverAll}>
          Entregar a la delegación ({toDeliver})
        </Button>
      </div>
    </div>
  );
}
