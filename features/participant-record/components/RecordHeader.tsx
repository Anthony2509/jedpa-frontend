import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/shared/ui/Avatar";

interface RecordHeaderProps {
  fullName: string;
  subtitle: string;
  backHref: string;
  backLabel: string;
  statusBadge: ReactNode;
  actions: ReactNode;
}

export function RecordHeader({ fullName, subtitle, backHref, backLabel, statusBadge, actions }: RecordHeaderProps) {
  return (
    <div className="mb-4">
      <Link href={backHref} className="mb-4 inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="size-3.5" /> {backLabel}
      </Link>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <span className="hidden sm:block">
          <Avatar name={fullName} size="lg" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h1 className="text-xl font-semibold text-neutral-900">{fullName}</h1>
            {statusBadge}
          </div>
          <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
        </div>
        <div className="flex gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">{actions}</div>
      </div>
    </div>
  );
}
