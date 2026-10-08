import type { ReactNode } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";

interface NextUpCardProps {
  positionLabel: string;
  fullName: string;
  details: string;
  /** What is still needed (chips). Omitted when the queue itself says it all. */
  pending?: ReactNode;
  ctaLabel: string;
  onAction: () => void;
  onOpen: () => void;
}

/** The single most important thing on a queue screen: who is next and what to do. */
export function NextUpCard(props: NextUpCardProps) {
  return (
    <section className="rounded-xl border border-neutral-200 border-l-4 border-l-brand bg-white p-4 shadow-sm sm:p-6">
      <p className="text-sm font-medium text-brand">{props.positionLabel}</p>
      <div className="mt-3 flex flex-col gap-4 sm:mt-4 sm:flex-row sm:items-center sm:gap-5">
        <span className="hidden sm:block">
          <Avatar name={props.fullName} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-neutral-950 sm:text-xl">{props.fullName}</h2>
          <p className="mt-0.5 text-sm text-neutral-500">{props.details}</p>
          {props.pending && <div className="mt-3">{props.pending}</div>}
        </div>
        <div className="flex flex-col items-stretch gap-1 sm:gap-2">
          <Button variant="brand" size="lg" onClick={props.onAction}>{props.ctaLabel}</Button>
          <Button variant="ghost" size="sm" onClick={props.onOpen}>Ver ficha completa</Button>
        </div>
      </div>
    </section>
  );
}
