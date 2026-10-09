"use client";

import { useEffect, useRef } from "react";

interface InlineErrorProps {
  message: string | null | undefined;
  className?: string;
}

/** Error from an action (save, activate…), shown next to where it happened and scrolled into view. */
export function InlineError({ message, className }: InlineErrorProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (message) ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [message]);

  if (!message) return null;
  return (
    <p ref={ref} role="alert" className={`text-sm text-brand ${className ?? ""}`}>
      {message}
    </p>
  );
}
