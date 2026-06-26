"use client";

import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { techs } from "@/lib/tech";
import type { Project, ProjectInput } from "@/lib/types";
import { TechBadge } from "../TechBadge";

const emptyForm: ProjectInput = {
  title: "",
  slug: "",
  description: "",
  category: "Web Apps",
  coverImage: "",
  siteUrl: "",
  repoUrl: null,
  status: "Publicado",
  dateLabel: "2026",
  complexity: "Media",
  technologies: ["next", "typescript", "postgresql"],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toInput(project: Project): ProjectInput {
  return {
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: project.category,
    coverImage: project.coverImage,
    siteUrl: project.siteUrl,
    repoUrl: project.repoUrl,
    status: project.status,
    dateLabel: project.dateLabel,
    complexity: project.complexity,
    technologies: project.technologies,
  };
}

export function AdminProjects({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState<ProjectInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!editingId && form.title && !form.slug) setForm((current) => ({ ...current, slug: slugify(current.title) }));
  }, [editingId, form.title, form.slug]);

  function update<K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function readFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("coverImage", String(reader.result));
    reader.readAsDataURL(file);
  }

  function toggleTech(slug: string) {
    setForm((current) => ({
      ...current,
      technologies: current.technologies.includes(slug)
        ? current.technologies.filter((item) => item !== slug)
        : [...current.technologies, slug],
    }));
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    startTransition(async () => {
      const payload = { ...form, slug: form.slug || slugify(form.title), repoUrl: form.repoUrl || null };
      const response = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setMessage(data.error || "No se pudo guardar. Revisa DATABASE_URL en Render/local.");
        return;
      }
      const saved = (await response.json()) as Project;
      setProjects((current) => editingId ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current]);
      setMessage(editingId ? "Proyecto actualizado." : "Proyecto agregado.");
      reset();
    });
  }

  function remove(id: number) {
    if (!confirm("Eliminar este proyecto?")) return;
    startTransition(async () => {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        setMessage("No se pudo eliminar el proyecto.");
        return;
      }
      setProjects((current) => current.filter((project) => project.id !== id));
    });
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[420px_1fr]">
      <form onSubmit={submit} className="premium-card h-fit p-6">
        <h2 className="text-2xl font-black text-white">{editingId ? "Editar proyecto" : "Nuevo proyecto"}</h2>
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            readFile(event.dataTransfer.files[0]);
          }}
          className="mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center border border-dashed border-white/15 bg-black/30 p-5 text-center transition hover:border-green-400/50"
        >
          {form.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.coverImage} alt="Portada" className="max-h-56 w-full object-cover" />
          ) : (
            <div>
              <ImagePlus className="mx-auto mb-3 h-8 w-8 text-green-400" />
              <p className="text-sm font-semibold text-white">Arrastra la portada aca</p>
              <p className="mt-1 text-xs text-zinc-500">o usa el explorador de archivos</p>
            </div>
          )}
          <input type="file" accept="image/*" onChange={(event) => readFile(event.target.files?.[0])} className="mt-4 block w-full text-sm text-zinc-400 file:mr-4 file:border-0 file:bg-green-500 file:px-4 file:py-2 file:font-bold file:text-black" />
        </div>

        <div className="mt-5 grid gap-4">
          <input required value={form.title} onChange={(event) => update("title", event.target.value)} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="Nombre del proyecto" />
          <input required value={form.slug} onChange={(event) => update("slug", slugify(event.target.value))} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="slug-url" />
          <textarea required value={form.description} onChange={(event) => update("description", event.target.value)} className="min-h-28 border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="Descripcion" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.category} onChange={(event) => update("category", event.target.value)} className="border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-green-400">
              {["Web Apps", "Dashboards", "APIs", "IA", "Mobile Apps", "Bots", "E-commerce"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={form.complexity} onChange={(event) => update("complexity", event.target.value)} className="border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-green-400">
              {["Baja", "Media", "Alta", "Enterprise"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input required value={form.status} onChange={(event) => update("status", event.target.value)} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="Estado" />
            <input required value={form.dateLabel} onChange={(event) => update("dateLabel", event.target.value)} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="Fecha" />
          </div>
          <input required value={form.siteUrl} onChange={(event) => update("siteUrl", event.target.value)} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="URL del sitio" />
          <input value={form.repoUrl || ""} onChange={(event) => update("repoUrl", event.target.value)} className="border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="URL repo GitHub opcional" />
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-zinc-300">Tecnologias</p>
          <div className="grid grid-cols-2 gap-2">
            {techs.map((tech) => (
              <button type="button" key={tech.slug} onClick={() => toggleTech(tech.slug)} className={`border px-3 py-2 text-left text-xs transition ${form.technologies.includes(tech.slug) ? "border-green-400 bg-green-400/10 text-green-300" : "border-white/10 text-zinc-400 hover:border-green-400/40"}`}>
                {tech.name}
              </button>
            ))}
          </div>
        </div>

        {message ? <p className="mt-4 text-sm text-green-300">{message}</p> : null}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button disabled={pending || !form.coverImage} className="bg-green-500 px-5 py-3 font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50">{pending ? "Guardando..." : "Guardar"}</button>
          <button type="button" onClick={reset} className="border border-white/10 px-5 py-3 font-bold text-zinc-300 transition hover:border-green-400/40 hover:text-green-400">Limpiar</button>
        </div>
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="premium-card grid gap-5 p-5 md:grid-cols-[220px_1fr_auto]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.coverImage} alt={project.title} className="h-36 w-full object-cover" />
            <div>
              <div className="mb-2 flex flex-wrap gap-2 text-xs">
                <span className="border border-green-400/30 bg-green-400/10 px-2 py-1 text-green-300">{project.category}</span>
                <span className="border border-white/10 px-2 py-1 text-zinc-400">{project.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => <TechBadge key={tech} slug={tech} compact />)}
              </div>
            </div>
            <div className="flex gap-2 md:flex-col">
              <button onClick={() => { setEditingId(project.id); setForm(toInput(project)); }} className="flex h-11 w-11 items-center justify-center border border-white/10 text-zinc-300 transition hover:border-green-400/40 hover:text-green-400" aria-label="Editar">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(project.id)} className="flex h-11 w-11 items-center justify-center border border-red-500/30 text-red-300 transition hover:bg-red-500/10" aria-label="Eliminar">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
