import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface QueueNavigatorProps {
  queueLabel: string;
  queueHref: string;
  remaining: number;
  currentDone: boolean;
  nextHref?: string;
}

export function QueueNavigator({ queueLabel, queueHref, remaining, currentDone, nextHref }: QueueNavigatorProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 mt-6 flex flex-col gap-3 rounded-lg border px-4 py-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5",
        currentDone ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white text-neutral-700",
      )}
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
        {currentDone && <Check className="size-4" />}
        {currentDone ? "Listo con este participante." : `Trabajando en la cola de ${queueLabel}.`}
        <span className="whitespace-nowrap opacity-70">Quedan {remaining} en la cola.</span>
      </p>
      <div className="flex items-center justify-between gap-4 text-sm sm:justify-end">
        <Link href={queueHref} className="whitespace-nowrap underline-offset-2 hover:underline">Volver a la cola</Link>
        {nextHref && (
          <Link
            href={nextHref}
            className={cn(
              "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 font-medium sm:h-9",
              currentDone ? "bg-white text-neutral-900" : "bg-neutral-900 text-white",
            )}
          >
            Siguiente participante <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
