import { BrandMark } from "@/shared/ui/BrandMark";

/** Full-screen placeholder while the saved session is being checked. */
export function SessionLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50 px-4">
      <BrandMark title="JEDPA 2026" subtitle="Gestión de credenciales" />
      <p className="text-sm text-neutral-500" role="status">Verificando tu sesión…</p>
    </div>
  );
}
