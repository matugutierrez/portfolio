import { getTech } from "@/lib/tech";

type TechBadgeProps = {
  slug: string;
  compact?: boolean;
};

export function TechBadge({ slug, compact = false }: TechBadgeProps) {
  const tech = getTech(slug);
  const Icon = tech.icon;

  return (
    <div className="group relative">
      <div
        className={`flex items-center justify-center border border-white/10 bg-white/[0.035] transition duration-250 hover:-translate-y-1 hover:border-green-400/50 hover:bg-green-400/10 ${
          compact ? "h-8 w-8 rounded" : "h-12 w-12 rounded-md"
        }`}
      >
        <Icon className={compact ? "h-4 w-4" : "h-6 w-6"} style={{ color: tech.color }} />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-48 -translate-x-1/2 border border-white/10 bg-[#0b0b0b] p-3 text-xs opacity-0 shadow-2xl transition duration-250 group-hover:opacity-100">
        <div className="font-semibold text-white">{tech.name}</div>
        <div className="mt-1 text-zinc-400">Dominio: {tech.level}</div>
        <div className="text-zinc-400">Experiencia: {tech.years} años</div>
        <div className="text-zinc-400">Proyectos: {tech.projects}</div>
      </div>
    </div>
  );
}
