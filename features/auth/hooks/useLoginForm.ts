"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/shared/lib/apiClient";
import { login, restoreSession } from "../services/session";
import { useSession } from "./useCurrentUser";

const HOME = "/dashboard";

export function useLoginForm() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // An open session (same tab) skips the login screen.
  useEffect(() => {
    void restoreSession();
  }, []);

  useEffect(() => {
    if (status === "authenticated") router.replace(HOME);
  }, [status, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError(getErrorMessage(err, "No se pudo iniciar sesión."));
      setSubmitting(false);
    }
  }

  return { email, password, error, submitting, setEmail, setPassword, handleSubmit };
}
