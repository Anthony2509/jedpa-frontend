import { Button } from "@/shared/ui/Button";
import { FileUploadButton } from "@/shared/ui/FileUploadButton";
import type { DocumentNextAction } from "../domain/documentDisplay";
import { ResolutionAction, type ResolutionActionProps } from "./ResolutionAction";

interface DocumentRowActionsProps {
  nextAction: DocumentNextAction;
  hasFile: boolean;
  required: boolean;
  resolution: ResolutionActionProps;
  onUpload: (file: File) => void;
  onApprove: () => void;
  onObserve: () => void;
}

/** Shows only the action that makes sense for the document's current state. */
export function DocumentRowActions(props: DocumentRowActionsProps) {
  const emphasis = props.required ? "primary" : "quiet";
  switch (props.nextAction) {
    case "confirm_resolution":
      return <ResolutionAction {...props.resolution} />;
    case "upload":
      return <FileUploadButton label="Subir archivo" emphasis={emphasis} onSelect={props.onUpload} />;
    case "replace":
      return <FileUploadButton label="Subir corrección" onSelect={props.onUpload} />;
    case "review":
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="h-9" onClick={props.onObserve}>Observar</Button>
          <Button variant="secondary" size="sm" className="h-9 border-neutral-900 px-4" onClick={props.onApprove}>Aprobar</Button>
        </div>
      );
    default:
      return props.hasFile ? <FileUploadButton label="Reemplazar" emphasis="quiet" onSelect={props.onUpload} /> : null;
  }
}
