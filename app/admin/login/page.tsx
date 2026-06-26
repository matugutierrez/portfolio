import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="premium-card w-full max-w-md p-8">
        <div className="mb-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center border border-green-400/30 bg-green-400/10 text-lg font-black text-green-400">MG</div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-400">Admin</p>
          <h1 className="mt-3 text-3xl font-black text-white">Panel de control</h1>
          <p className="mt-2 text-sm text-zinc-400">Ingresa para gestionar los proyectos exhibidos.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
