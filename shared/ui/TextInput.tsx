import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";
import { INPUT_CLASSES } from "./inputClasses";

export function TextInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(INPUT_CLASSES, "h-10", className)} {...rest} />;
}
