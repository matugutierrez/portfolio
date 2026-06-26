import { BriefcaseBusiness, Code2, GraduationCap, Layers3, Mail, Rocket, UserRound, Wrench } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";

const links = [
  { href: "#inicio", label: "Inicio", icon: Rocket },
  { href: "#sobre-mi", label: "Sobre mi", icon: UserRound },
  { href: "#proyectos", label: "Proyectos", icon: Layers3 },
  { href: "#experiencia", label: "Experiencia", icon: BriefcaseBusiness },
  { href: "#habilidades", label: "Habilidades", icon: Wrench },
  { href: "#tecnologias", label: "Tecnologias", icon: Code2 },
  { href: "#educacion", label: "Educacion", icon: GraduationCap },
  { href: "#contacto", label: "Contacto", icon: Mail },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[292px] border-r border-white/10 bg-[#080808]/95 p-7 backdrop-blur-xl xl:flex xl:flex-col">
      <div>
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md border border-green-400/30 bg-green-400/10 text-2xl font-black tracking-tighter text-green-400">
          MG
        </div>
        <h1 className="text-xl font-bold text-white">Matias Gutierrez</h1>
        <p className="mt-1 text-sm text-zinc-400">Full Stack Developer</p>
      </div>

      <nav className="mt-10 space-y-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 border px-4 py-3 text-sm transition duration-250 hover:border-green-400/40 hover:bg-green-400/10 hover:text-white ${
                index === 0
                  ? "border-green-400/35 bg-green-400/10 text-green-300"
                  : "border-transparent text-zinc-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="mb-5 border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-sm text-white">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.9)]" />
            Disponible para nuevos proyectos
          </div>
          <p className="mt-1 text-xs text-zinc-500">Freelance y posiciones Full Stack</p>
        </div>
        <a href="#contacto" className="block bg-green-500 px-5 py-3 text-center text-sm font-bold text-black transition duration-250 hover:bg-green-400">
          Contactar
        </a>
        <div className="mt-5 flex items-center gap-3">
          <a aria-label="GitHub" href="https://github.com" className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-300 transition hover:border-green-400/50 hover:text-green-400">
            <SiGithub />
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com" className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-300 transition hover:border-green-400/50 hover:text-green-400">
            <SiLinkedin />
          </a>
          <a aria-label="Email" href="mailto:matias@example.com" className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-300 transition hover:border-green-400/50 hover:text-green-400">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
