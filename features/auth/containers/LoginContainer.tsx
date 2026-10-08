"use client";

import { LoginForm } from "../components/LoginForm";
import { LoginLayout } from "../components/LoginLayout";
import { useLoginForm } from "../hooks/useLoginForm";

export function LoginContainer() {
  const form = useLoginForm();

  return (
    <LoginLayout>
      <LoginForm
        email={form.email}
        password={form.password}
        error={form.error}
        submitting={form.submitting}
        onEmailChange={form.setEmail}
        onPasswordChange={form.setPassword}
        onSubmit={form.handleSubmit}
      />
    </LoginLayout>
  );
}
