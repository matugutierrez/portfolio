import { redirect } from "next/navigation";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { isAdmin } from "@/lib/auth";
import { getProjects } from "@/lib/db";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const projects = await getProjects();

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-400">Panel Admin</p>
            <h1 className="mt-3 text-4xl font-black text-white">Gestionar proyectos</h1>
            <p className="mt-2 text-zinc-400">Agrega, edita o elimina las paginas exhibidas en el portfolio.</p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-green-400/40 hover:text-green-400">Ver portfolio</a>
            <LogoutButton />
          </div>
        </div>
        <AdminProjects initialProjects={projects} />
      </div>
    </main>
  );
}
