import { CheckCircle2 } from "lucide-react";

interface QueueDoneStateProps {
  title: string;
  message: string;
}

export function QueueDoneState({ title, message }: QueueDoneStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
      <CheckCircle2 className="size-10 text-neutral-900" />
      <h2 className="mt-4 text-lg font-semibold text-neutral-950">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-neutral-500">{message}</p>
    </div>
  );
}
