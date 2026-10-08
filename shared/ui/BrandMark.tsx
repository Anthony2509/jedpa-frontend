interface BrandMarkProps {
  title: string;
  subtitle?: string;
}

export function BrandMark({ title, subtitle }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="size-7 rounded-md bg-brand" aria-hidden />
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-tight text-neutral-900">{title}</p>
        {subtitle && <p className="text-[11px] text-neutral-500">{subtitle}</p>}
      </div>
    </div>
  );
}
