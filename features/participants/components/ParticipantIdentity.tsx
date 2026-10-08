import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "@/shared/ui/Avatar";

interface ParticipantIdentityProps {
  fullName: string;
  identity: string;
  /** Extra context on the identity line, e.g. "Deportista · M1-AJD-A-D" in phone cards. */
  meta?: string;
  /** Content under the name (chips, a status line) aligned with the text, not the avatar. */
  children?: ReactNode;
}

export function ParticipantIdentity({ fullName, identity, meta, children }: ParticipantIdentityProps) {
  return (
    <div className={cn("flex gap-3", children ? "items-start" : "items-center")}>
      <Avatar name={fullName} />
      <div className="min-w-0">
        <p className="font-semibold leading-snug text-neutral-950">{fullName}</p>
        <p className="text-xs leading-snug text-neutral-500">{identity}</p>
        {meta && <p className="mt-0.5 text-xs leading-snug text-neutral-700">{meta}</p>}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
}
