import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { INPUT_CLASSES } from "./inputClasses";

export function TextArea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} className={cn(INPUT_CLASSES, "py-2", className)} {...rest} />;
}
