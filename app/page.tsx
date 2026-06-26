import { BarChart3, BriefcaseBusiness, Code2, Rocket } from "lucide-react";
import { getProjects } from "@/lib/db";
import { techs } from "@/lib/tech";
import { HeroVisual } from "@/components/HeroVisual";
import { PortfolioSections } from "@/components/PortfolioSections";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Sidebar } from "@/components/Sidebar";
import { TechBadge } from "@/components/TechBadge";

const stats = [
  { label: "Anios de experiencia", value: "+2", icon: BriefcaseBusiness },
  { label: "Proyectos completados", value: "+20", icon: Rocket },
  { label: "Tecnologias dominadas", value: "+15", icon: Code2 },
  { label: "Compromiso", value: "+100%", icon: BarChart3 },
];

export default async function Home() {
  const projects = await getProjects();

  return (
    <main id="inicio" className="min-h-screen">
      <Sidebar />
      <div className="xl:pl-[292px]">
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12">
          <section className="relative min-h-screen overflow-hidden pt-6">
            <div className="mb-16 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">
                <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.9)]" />
                Disponible para trabajar
              </div>
              <a href="/admin" className="border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-green-400/40 hover:text-green-400">Admin</a>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
              <div className="relative z-10">
                <p className="text-lg font-semibold text-green-400">Hola, soy</p>
                <h1 className="mt-4 text-6xl font-black tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">Matias Gutierrez</h1>
                <h2 className="mt-4 bg-gradient-to-r from-green-300 via-green-500 to-green-700 bg-clip-text text-4xl font-black tracking-[-0.06em] text-transparent sm:text-5xl">
                  Desarrollador Full Stack
                </h2>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300">
                  Desarrollo aplicaciones web modernas, escalables y de alto rendimiento. Transformo ideas en soluciones digitales robustas, elegantes y preparadas para crecer.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#proyectos" className="bg-green-500 px-7 py-4 text-center font-bold text-black transition duration-250 hover:bg-green-400">Ver proyectos</a>
                  <a href="#sobre-mi" className="border border-white/15 px-7 py-4 text-center font-bold text-white transition duration-250 hover:border-green-400/50 hover:text-green-400">Sobre mi</a>
                </div>
                <div className="mt-12 flex flex-wrap gap-3">
                  {techs.slice(0, 16).map((tech) => <TechBadge key={tech.slug} slug={tech.slug} />)}
                </div>
              </div>
              <HeroVisual />
            </div>

            <div className="premium-card mt-14 grid gap-0 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="green-glow flex items-center justify-center gap-5 p-7 transition duration-250">
                    <Icon className="h-7 w-7 text-green-400" />
                    <div>
                      <p className="text-3xl font-black text-white">{stat.value}</p>
                      <p className="text-sm text-zinc-400">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <ProjectGrid projects={projects} />
          <PortfolioSections />
        </div>
      </div>
    </main>
  );
}
