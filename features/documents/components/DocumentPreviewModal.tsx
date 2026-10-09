import { Modal } from "@/shared/ui/Modal";
import { FileBox } from "./FileBox";

interface DocumentPreviewModalProps {
  open: boolean;
  documentLabel: string;
  fileName?: string;
  mimeType?: string;
  /** Signed, short-lived link. Without it (mock data) only a placeholder is shown. */
  url?: string;
  onClose: () => void;
}

/**
 * Images are shown here. PDFs open in a new tab: the API does not allow them inside another
 * site's frame. The link expires in minutes (60 s for health documents).
 */
export function DocumentPreviewModal({ open, documentLabel, fileName, mimeType, url, onClose }: DocumentPreviewModalProps) {
  return (
    <Modal open={open} title={documentLabel} description={fileName} onClose={onClose}>
      {!url ? (
        <FileBox message="Vista previa no disponible en los datos de prueba." />
      ) : mimeType?.startsWith("image/") ? (
        // eslint-disable-next-line @next/next/no-img-element -- signed link to a private file, not a static asset
        <img src={url} alt={documentLabel} className="mx-auto max-h-[70vh] rounded-md border border-neutral-200" />
      ) : (
        <FileBox message="El PDF se abre en otra pestaña con un enlace temporal." url={url} />
      )}
    </Modal>
  );
}
