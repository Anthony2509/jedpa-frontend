import { Badge } from "@/shared/ui/Badge";

export function ResolutionStatusBadge({ uploaded }: { uploaded: boolean }) {
  return uploaded ? <Badge tone="muted">Cargada</Badge> : <Badge tone="brand">Falta cargar</Badge>;
}
