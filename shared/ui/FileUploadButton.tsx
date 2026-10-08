import { Upload } from "lucide-react";
import { useId } from "react";
import { cn } from "@/shared/lib/cn";

interface FileUploadButtonProps {
  label: string;
  emphasis?: "primary" | "quiet";
  onSelect: (fileName: string) => void;
}

const EMPHASIS_CLASSES = {
  primary: "h-9 bg-neutral-900 px-4 text-sm text-white hover:bg-neutral-700",
  quiet: "h-8 px-2 text-xs text-neutral-500 hover:text-neutral-900",
};

export function FileUploadButton({ label, emphasis = "primary", onSelect }: FileUploadButtonProps) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={cn("relative inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium", EMPHASIS_CLASSES[emphasis])}
    >
      <Upload className="size-3.5" />
      {label}
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onSelect(file.name);
          event.target.value = "";
        }}
      />
    </label>
  );
}
