import { Button } from "@/shared/ui/Button";

export interface ResolutionActionProps {
  macro?: string;
  available: boolean;
  onConfirm: () => void;
}

/** The RD is uploaded once per macro; here the reviewer only confirms the person appears in it. */
export function ResolutionAction({ macro, available, onConfirm }: ResolutionActionProps) {
  if (!available) {
    return <p className="text-xs text-neutral-500 sm:max-w-56 sm:text-right">Primero hay que cargar la resolución de {macro ?? "su macro"}.</p>;
  }
  return (
    <Button variant="secondary" size="sm" className="h-9 border-neutral-900 px-4" onClick={onConfirm}>
      Figura en la RD de {macro}
    </Button>
  );
}
