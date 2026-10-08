import type { ReactNode } from "react";
import { AppShell } from "@/features/navigation";
import { ParticipantsDataProvider } from "@/features/participants";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ParticipantsDataProvider>
      <AppShell>{children}</AppShell>
    </ParticipantsDataProvider>
  );
}
