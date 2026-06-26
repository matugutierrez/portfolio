import { ArrowUp, Award, BriefcaseBusiness, CheckCircle2, GraduationCap, Mail, MapPin, ShieldCheck } from "lucide-react";
import { techs } from "@/lib/tech";
import { TechBadge } from "./TechBadge";

const skills = [
  { group: "Frontend", items: [["React", 92], ["Next.js", 90], ["Tailwind", 94]] },
  { group: "Backend", items: [["Node.js", 90], ["Express", 86], ["APIs REST", 92]] },
  { group: "Bases de Datos", items: [["PostgreSQL", 88], ["MongoDB", 78], ["Redis", 72]] },
  { group: "DevOps", items: [["Render", 82], ["GitHub", 90], ["CI/CD", 76]] },
  { group: "Cloud", items: [["AWS", 70], ["Deploy", 88], ["Escalabilidad", 80]] },
  { group: "Testing", items: [["QA Manual", 78], ["E2E", 68], ["Validaciones", 86]] },
  { group: "Arquitectura", items: [["Modularidad", 90], ["Seguridad", 82], ["Performance", 88]] },
  { group: "UI/UX", items: [["Interfaces SaaS", 90], ["Accesibilidad", 82], ["Responsive", 94]] },
];

export function PortfolioSections() {
  return (
    <>
      <section id="sobre-mi" className="grid scroll-mt-10 gap-8 py-24 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Sobre mi</p>
          <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Construyo productos digitales solidos.</h2>
        </div>
        <div className="premium-card p-8">
          <p className="text-lg leading-8 text-zinc-300">
            Soy Matias Gutierrez, desarrollador Full Stack enfocado en crear aplicaciones modernas, escalables y de alto rendimiento. Trabajo combinando criterio tecnico, diseño limpio y una vision de producto orientada a resultados.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Arquitectura clara", "Interfaces premium", "Backend robusto"].map((item) => (
              <div key={item} className="border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                <CheckCircle2 className="mb-3 h-5 w-5 text-green-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" className="scroll-mt-10 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Experiencia</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Recorrido profesional</h2>
        <div className="mt-10 space-y-5 border-l border-white/10 pl-6">
          {[
            ["Desarrollador Full Stack Independiente", "2024 - Actualidad", "Next.js, Node.js, PostgreSQL", "Desarrollo de sistemas web, dashboards, APIs y paneles administrativos para negocios digitales."],
            ["Proyectos SaaS y E-commerce", "2023 - 2024", "React, TypeScript, MongoDB", "Implementacion de experiencias de compra, autenticacion, integraciones y optimizacion de performance."],
          ].map(([title, date, stack, detail]) => (
            <div key={title} className="premium-card relative p-6 before:absolute before:-left-[31px] before:top-7 before:h-3 before:w-3 before:rounded-full before:bg-green-400">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <span className="text-sm text-green-400">{date}</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">{stack}</p>
              <p className="mt-4 leading-7 text-zinc-300">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="habilidades" className="scroll-mt-10 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Habilidades</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Capacidades tecnicas</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill.group} className="premium-card green-glow p-6 transition duration-250">
              <h3 className="mb-5 text-lg font-bold text-white">{skill.group}</h3>
              <div className="space-y-4">
                {skill.items.map(([name, value]) => (
                  <div key={name as string}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-zinc-300">{name}</span>
                      <span className="text-green-400">{value}%</span>
                    </div>
                    <div className="h-2 bg-white/10">
                      <div className="h-full bg-gradient-to-r from-green-700 to-green-400" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="tecnologias" className="scroll-mt-10 py-24">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Tecnologias</p>
        <h2 className="mt-3 text-4xl font-black text-white md:text-5xl">Stack de trabajo</h2>
        <div className="mt-10 flex flex-wrap gap-4">
          {techs.map((tech) => <TechBadge key={tech.slug} slug={tech.slug} />)}
        </div>
      </section>

      <section id="educacion" className="scroll-mt-10 grid gap-6 py-24 lg:grid-cols-2">
        <div className="premium-card p-8">
          <GraduationCap className="mb-5 h-8 w-8 text-green-400" />
          <h2 className="text-3xl font-black text-white">Educacion</h2>
          <p className="mt-4 leading-7 text-zinc-300">Formacion continua en desarrollo web moderno, arquitectura de software, bases de datos, cloud y buenas practicas de producto digital.</p>
        </div>
        <div className="premium-card p-8">
          <Award className="mb-5 h-8 w-8 text-green-400" />
          <h2 className="text-3xl font-black text-white">Certificados</h2>
          <p className="mt-4 leading-7 text-zinc-300">Seccion preparada para agregar certificados, institucion, fecha y enlace verificable desde futuras mejoras del panel.</p>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-10 py-24">
        <div className="premium-card grid gap-8 p-8 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-green-400">Contacto</p>
            <h2 className="mt-3 text-4xl font-black text-white">Hablemos de tu proximo proyecto.</h2>
            <div className="mt-8 space-y-4 text-zinc-300">
              <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-green-400" /> matias@example.com</p>
              <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-green-400" /> Argentina / Remoto</p>
              <p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-green-400" /> Disponible para trabajar</p>
            </div>
          </div>
          <form className="space-y-4">
            <input className="w-full border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-green-400" placeholder="Nombre" />
            <input className="w-full border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-green-400" placeholder="Email" type="email" />
            <textarea className="min-h-36 w-full border border-white/10 bg-black/30 px-4 py-4 text-white outline-none transition focus:border-green-400" placeholder="Mensaje" />
            <button type="button" className="w-full bg-green-500 px-5 py-4 font-bold text-black transition hover:bg-green-400">Enviar</button>
          </form>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-white/10 py-10 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Matias Gutierrez. Todos los derechos reservados.</p>
        <a href="#inicio" className="flex items-center gap-2 text-green-400 hover:text-green-300">Volver al inicio <ArrowUp className="h-4 w-4" /></a>
      </footer>
    </>
  );
}
