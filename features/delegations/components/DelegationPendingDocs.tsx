interface DelegationPendingDocsProps {
  count: number;
}

export function DelegationPendingDocs({ count }: DelegationPendingDocsProps) {
  if (!count) return <span className="text-xs text-neutral-400">Documentos al día</span>;
  return (
    <span className="text-xs text-neutral-600">
      <span className="text-sm font-semibold tabular-nums text-brand">{count}</span> con documentos pendientes
    </span>
  );
}
