import { Button } from "@/shared/ui/Button";
import { FileUploadButton } from "@/shared/ui/FileUploadButton";
import { InlineError } from "@/shared/ui/InlineError";
import { Modal } from "@/shared/ui/Modal";
import type { ImportPreview, ImportResult } from "../services/importApi";
import { ImportSummary } from "./ImportSummary";

interface ImportExcelModalProps {
  open: boolean;
  fileName?: string;
  preview: ImportPreview | null;
  result: ImportResult | null;
  error: string | null;
  busy: boolean;
  onSelectFile: (file: File) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export function ImportExcelModal(props: ImportExcelModalProps) {
  const canImport = props.preview && props.preview.invalidRows === 0 && props.preview.toCreate > 0 && !props.result;
  return (
    <Modal
      open={props.open}
      title="Importar participantes desde Excel"
      description="Export del sistema de inscripción (hoja LISTA LIMPIA). Primero se valida sin guardar nada."
      onClose={props.onClose}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose}>{props.result ? "Cerrar" : "Cancelar"}</Button>
          {!props.result && (
            <Button disabled={!canImport || props.busy} onClick={props.onConfirm}>
              {props.busy && props.preview ? "Importando…" : `Importar ${props.preview?.toCreate ?? ""}`.trim()}
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <FileUploadButton label={props.fileName ? "Elegir otro archivo" : "Elegir archivo .xlsx"} accept=".xlsx" disabled={props.busy} onSelect={props.onSelectFile} />
          {props.fileName && <span className="text-sm text-neutral-600">{props.fileName}</span>}
        </div>
        {props.busy && !props.preview && <p className="text-sm text-neutral-500">Validando el archivo…</p>}
        {props.result ? (
          <p className="rounded-md bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
            Se importaron <b>{props.result.created}</b> participantes. {props.result.skippedExisting} ya estaban registrados y se omitieron.
            {props.result.delegationsCreated.length > 0 && ` Delegaciones creadas: ${props.result.delegationsCreated.join(", ")}.`}
          </p>
        ) : (
          props.preview && <ImportSummary preview={props.preview} />
        )}
        <p className="text-xs text-neutral-500">Las columnas USUARIO y PASSWORD del Excel nunca se leen ni se guardan.</p>
        <InlineError message={props.error} />
      </div>
    </Modal>
  );
}
