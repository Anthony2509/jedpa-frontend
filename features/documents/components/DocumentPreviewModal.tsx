import { FileText } from "lucide-react";
import { Modal } from "@/shared/ui/Modal";

interface DocumentPreviewModalProps {
  open: boolean;
  documentLabel: string;
  fileName?: string;
  onClose: () => void;
}

export function DocumentPreviewModal({ open, documentLabel, fileName, onClose }: DocumentPreviewModalProps) {
  return (
    <Modal open={open} title={documentLabel} description={fileName} onClose={onClose}>
      <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-md border border-dashed border-neutral-300 bg-neutral-50 text-neutral-400">
        <FileText className="size-10" />
        <p className="text-sm">Vista previa del archivo</p>
        <p className="text-xs">Se cargará desde Cloudinary con acceso protegido.</p>
      </div>
    </Modal>
  );
}
