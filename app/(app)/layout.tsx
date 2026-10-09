import type { ReactNode } from "react";
import { AuthGuard } from "@/features/auth";
import { AppShell } from "@/features/navigation";
import { ParticipantsDataProvider } from "@/features/participants";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <ParticipantsDataProvider>
        <AppShell>{children}</AppShell>
      </ParticipantsDataProvider>
    </AuthGuard>
  );
}
