import type { FormEvent } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { TextInput } from "@/shared/ui/TextInput";

interface LoginFormProps {
  email: string;
  password: string;
  error: string | null;
  submitting: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function LoginForm(props: LoginFormProps) {
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col gap-4">
      <Field label="Correo electrónico" htmlFor="email">
        <TextInput
          id="email"
          type="email"
          autoComplete="email"
          placeholder="usuario@ipd.gob.pe"
          value={props.email}
          onChange={(event) => props.onEmailChange(event.target.value)}
        />
      </Field>
      <Field label="Contraseña" htmlFor="password">
        <TextInput
          id="password"
          type="password"
          autoComplete="current-password"
          value={props.password}
          onChange={(event) => props.onPasswordChange(event.target.value)}
        />
      </Field>
      {props.error && <p className="text-sm text-brand">{props.error}</p>}
      <Button type="submit" disabled={props.submitting} className="mt-2 w-full">
        {props.submitting ? "Ingresando…" : "Ingresar"}
      </Button>
      <button type="button" className="text-center text-xs text-neutral-500 hover:text-neutral-900">
        ¿Olvidaste tu contraseña?
      </button>
    </form>
  );
}
