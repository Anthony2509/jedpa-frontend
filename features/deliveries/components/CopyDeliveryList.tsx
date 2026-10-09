import { PackageCheck } from "lucide-react";
import { getCopyLabel, type CredentialCopy } from "@/features/participants";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";

interface CopyDeliveryListProps {
  copies: CredentialCopy[];
  formatDate: (iso: string) => string;
  /** TEMP(backend): false while the API has no deliveries module. */
  canDeliver: boolean;
  onDeliver: (copy: CredentialCopy) => void;
}

/** Original + duplicates, each with its own delivery. Only the latest pending copy gets the main action. */
export function CopyDeliveryList({ copies, formatDate, canDeliver, onDeliver }: CopyDeliveryListProps) {
  const latest = copies.at(-1)?.number;
  return (
    <ul className="-my-3 divide-y divide-neutral-100">
      {copies.filter((copy) => !copy.revoked).map((copy) => (
        <li key={copy.number} className="flex flex-wrap items-center justify-between gap-4 py-3">
          <div>
            <p className="text-sm font-semibold text-neutral-900">{getCopyLabel(copy)}</p>
            <p className="text-xs text-neutral-500">
              {copy.delivery
                ? `Entregada en ${copy.delivery.placeName} · ${formatDate(copy.delivery.at)} · ${copy.delivery.by}`
                : `Impresa el ${formatDate(copy.printedAt)}${copy.reason ? ` · ${copy.reason}` : ""}`}
            </p>
          </div>
          {copy.delivery ? (
            <Badge tone="muted">Entregada</Badge>
          ) : !canDeliver ? (
            <Badge tone="outline">Por entregar</Badge>
          ) : (
            <Button
              variant={copy.number === latest ? "brand" : "secondary"}
              size={copy.number === latest ? "lg" : "sm"}
              icon={<PackageCheck className="size-4" />}
              onClick={() => onDeliver(copy)}
            >
              Registrar entrega
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}
