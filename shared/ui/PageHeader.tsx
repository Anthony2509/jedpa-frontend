import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
      <div>
        {eyebrow && <p className="mb-1.5 text-sm font-medium text-brand">{eyebrow}</p>}
        <h1 className="text-2xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-[28px]">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-[15px]">{description}</p>}
      </div>
      {actions && <div className="flex w-full flex-wrap gap-2 sm:w-auto [&>*]:grow sm:[&>*]:grow-0">{actions}</div>}
    </div>
  );
}
