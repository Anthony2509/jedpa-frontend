import { Suspense } from "react";
import { VerificationContainer } from "@/features/verification";

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10">
      <Suspense fallback={<p className="text-sm text-neutral-500">Verificando credencial…</p>}>
        <VerificationContainer />
      </Suspense>
    </main>
  );
}
