import { DefinitionList } from "@/shared/ui/DefinitionList";
import type { ImportPreview } from "../services/importApi";

interface ImportSummaryProps {
  preview: ImportPreview;
}

const MAX_ERRORS_SHOWN = 30;

/** What the import would do, and every row that blocks it. */
export function ImportSummary({ preview }: ImportSummaryProps) {
  return (
    <div className="space-y-4">
      <DefinitionList
        items={[
          { label: "Hoja", value: preview.sheet },
          { label: "Filas leídas", value: String(preview.totalRows) },
          { label: "Participantes nuevos", value: String(preview.toCreate) },
          { label: "Ya registrados (se omiten)", value: String(preview.alreadyRegistered) },
          { label: "Delegaciones nuevas", value: preview.newDelegations.length ? preview.newDelegations.join(", ") : "Ninguna" },
        ]}
      />
      {preview.invalidRows > 0 && (
        <div>
          <p className="text-sm font-semibold text-brand">
            {preview.invalidRows} {preview.invalidRows === 1 ? "fila tiene errores" : "filas tienen errores"}: corrígelas en el Excel y vuelve a cargarlo.
          </p>
          <ul className="mt-2 max-h-56 divide-y divide-neutral-100 overflow-y-auto rounded-md border border-neutral-200 text-sm">
            {preview.errors.slice(0, MAX_ERRORS_SHOWN).map((item) => (
              <li key={item.row} className="px-3 py-2">
                <span className="font-medium text-neutral-900">Fila {item.row}: </span>
                <span className="text-neutral-700">{item.errors.join(" ")}</span>
              </li>
            ))}
          </ul>
          {preview.errors.length > MAX_ERRORS_SHOWN && (
            <p className="mt-1 text-xs text-neutral-500">Se muestran las primeras {MAX_ERRORS_SHOWN} filas con errores.</p>
          )}
        </div>
      )}
    </div>
  );
}
