"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.get("username"), password: form.get("password") }),
      });
      if (!response.ok) {
        setError("Usuario o contrasena incorrectos.");
        return;
      }
      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="username" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-green-400" placeholder="Usuario" autoComplete="username" />
      <input name="password" className="w-full border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-green-400" placeholder="Password" type="password" autoComplete="current-password" />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button disabled={pending} className="w-full bg-green-500 px-5 py-4 font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50">
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
