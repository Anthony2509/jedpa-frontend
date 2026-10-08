import type { ReactNode } from "react";
import { BrandMark } from "@/shared/ui/BrandMark";

interface LoginLayoutProps {
  children: ReactNode;
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <BrandMark title="JEDPA 2026" subtitle="Gestión de credenciales" />
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-neutral-900">Iniciar sesión</h1>
          <p className="mb-6 mt-1 text-sm text-neutral-500">Acceso para personal autorizado.</p>
          {children}
        </div>
        <p className="mt-6 text-center text-xs text-neutral-400">
          Juegos Escolares Deportivos y Paradeportivos
        </p>
      </div>
    </div>
  );
}
