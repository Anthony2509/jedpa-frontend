import type { ReactNode } from "react";
import { BadgeCheck, FileSpreadsheet, FileText, History, Home, MapPin, UserCog, Users, UsersRound } from "lucide-react";
import type { Permission } from "@/features/auth";
import type { WorkQueueId } from "@/features/participants";

export interface NavigationItem {
  href: string;
  label: string;
  icon?: ReactNode;
  permission?: Permission;
}

export interface NavigationGroup {
  title?: string;
  items: NavigationItem[];
}

const icon = "size-4";

/** "Proceso" items are generated from WORK_QUEUES so the menu always follows the happy path. */
export const PROCESS_QUEUES: WorkQueueId[] = ["registration", "review", "credentials", "delivery"];

export const STATIC_GROUPS: { home: NavigationGroup; rest: NavigationGroup[] } = {
  home: { items: [{ href: "/dashboard", label: "Inicio", icon: <Home className={icon} /> }] },
  rest: [
    {
      title: "Otras credenciales",
      items: [
        { href: "/special-credentials", label: "Credenciales especiales", icon: <BadgeCheck className={icon} />, permission: "special_credentials" },
      ],
    },
    {
      title: "Consulta",
      items: [
        { href: "/participants", label: "Participantes", icon: <Users className={icon} />, permission: "participants" },
        { href: "/delegations", label: "Delegaciones", icon: <UsersRound className={icon} />, permission: "participants" },
        { href: "/reports", label: "Reportes", icon: <FileSpreadsheet className={icon} />, permission: "reports_basic" },
        { href: "/audit", label: "Auditoría", icon: <History className={icon} />, permission: "audit" },
      ],
    },
    {
      title: "Configuración",
      items: [
        { href: "/resolutions", label: "Resoluciones directorales", icon: <FileText className={icon} />, permission: "resolutions" },
        { href: "/administration/users", label: "Usuarios", icon: <UserCog className={icon} />, permission: "administration" },
        { href: "/administration/delivery-places", label: "Lugares de entrega", icon: <MapPin className={icon} />, permission: "administration" },
      ],
    },
  ],
};

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
