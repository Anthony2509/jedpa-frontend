import type { Role } from "../types";

export const ROLE_META: Record<Role, { label: string; description: string }> = {
  admin: { label: "Administrador", description: "Todo el sistema, usuarios, configuración, reportería completa y auditoría." },
  coordinator: { label: "Coordinador", description: "Participantes, delegaciones, credenciales especiales y reportería básica." },
  operator: { label: "Operador", description: "Participantes y delegaciones: subir y revisar documentos, imprimir y entregar." },
};

export const ROLES = Object.keys(ROLE_META) as Role[];
