interface InlineErrorProps {
  message: string | null | undefined;
  className?: string;
}

/** Error from an action (save, activate…), shown next to where it happened. */
export function InlineError({ message, className }: InlineErrorProps) {
  if (!message) return null;
  return (
    <p role="alert" className={`text-sm text-brand ${className ?? ""}`}>
      {message}
    </p>
  );
}
