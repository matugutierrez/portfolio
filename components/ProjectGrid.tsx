"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/types";
import { TechBadge } from "./TechBadge";

const filters = ["Todos", "Web Apps", "Dashboards", "APIs", "IA", "Mobile Apps", "Bots", "E-commerce"];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((project) => project.category === active);

  return (
    <section id="proyectos" className="scroll-mt-10 py-24">
      <div className="mb-9 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Mis proyectos</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Proyectos Destacados</h2>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`whitespace-nowrap border px-4 py-2 text-sm transition duration-250 ${
                active === filter
                  ? "border-green-400 bg-green-400 text-black"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-green-400/50 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((project) => (
          <article key={project.id} className="premium-card green-glow group overflow-hidden transition duration-250 hover:-translate-y-1">
            <div className="aspect-[16/9] overflow-hidden border-b border-white/10 bg-[#0f0f0f]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover opacity-90 transition duration-250 group-hover:scale-[1.025] group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap gap-2 text-xs">
                <span className="border border-green-400/30 bg-green-400/10 px-2 py-1 font-semibold text-green-300">{project.status}</span>
                <span className="border border-white/10 px-2 py-1 text-zinc-400">{project.dateLabel}</span>
                <span className="border border-white/10 px-2 py-1 text-zinc-400">Complejidad {project.complexity}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} slug={tech} compact />
                ))}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a href={project.siteUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm font-semibold text-green-300 transition hover:bg-green-400 hover:text-black">
                  Visitar sitio <ExternalLink className="h-4 w-4" />
                </a>
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-green-400/40 hover:text-green-400">
                    <SiGithub /> Ver repositorio
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
