import { Printer, QrCode } from "lucide-react";
import { Button } from "@/shared/ui/Button";

interface CredentialActionPanelProps {
  canIssue: boolean;
  canPrint: boolean;
  /** API flow: printing also creates the code and the QR (there is no separate "generate" step). */
  printCreatesQr: boolean;
  busy: boolean;
  onIssue: () => void;
  onPrint: () => void;
}

export function CredentialActionPanel({ canIssue, canPrint, printCreatesQr, busy, onIssue, onPrint }: CredentialActionPanelProps) {
  if (canIssue) {
    return (
      <div className="order-first flex flex-col gap-2 sm:order-none sm:max-w-64">
        <Button variant="brand" size="lg" icon={<QrCode className="size-4" />} disabled={busy} onClick={onIssue}>Generar credencial</Button>
        <p className="text-xs text-neutral-500">Se crea el código único y el QR. Después podrás imprimirla.</p>
      </div>
    );
  }
  if (canPrint) {
    return (
      <div className="order-first flex flex-col gap-2 sm:order-none sm:max-w-64">
        <Button variant="brand" size="lg" icon={<Printer className="size-4" />} disabled={busy} onClick={onPrint}>
          {busy ? "Preparando PDF…" : "Imprimir credencial"}
        </Button>
        <p className="text-xs text-neutral-500">
          {printCreatesQr ? "Se registra el original con su QR y se abre el PDF para la impresora. " : ""}
          Imprimir no marca la credencial como entregada.
        </p>
      </div>
    );
  }
  return null;
}
