import { Printer, QrCode } from "lucide-react";
import { Button } from "@/shared/ui/Button";

interface CredentialActionPanelProps {
  canIssue: boolean;
  canPrint: boolean;
  onIssue: () => void;
  onPrint: () => void;
}

export function CredentialActionPanel({ canIssue, canPrint, onIssue, onPrint }: CredentialActionPanelProps) {
  if (canIssue) {
    return (
      <div className="order-first flex flex-col gap-2 sm:order-none sm:max-w-64">
        <Button variant="brand" size="lg" icon={<QrCode className="size-4" />} onClick={onIssue}>Generar credencial</Button>
        <p className="text-xs text-neutral-500">Se crea el código único y el QR. Después podrás imprimirla.</p>
      </div>
    );
  }
  if (canPrint) {
    return (
      <div className="order-first flex flex-col gap-2 sm:order-none sm:max-w-64">
        <Button variant="brand" size="lg" icon={<Printer className="size-4" />} onClick={onPrint}>Imprimir credencial</Button>
        <p className="text-xs text-neutral-500">Imprimir no marca la credencial como entregada.</p>
      </div>
    );
  }
  return null;
}
