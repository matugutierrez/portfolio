import { Activity, Bell, CircleUserRound, MoreHorizontal } from "lucide-react";

export function HeroVisual() {
  return (
    <div className="relative hidden min-h-[430px] lg:block">
      <div className="absolute right-0 top-12 h-[315px] w-[570px] -rotate-3 border border-white/10 bg-[#0b0b0b] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.7)]">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-green-400/30 bg-green-400/10 text-sm font-black text-green-400">MG</div>
            <div>
              <p className="text-sm font-semibold text-white">Dashboard</p>
              <p className="text-xs text-zinc-500">Portfolio admin system</p>
            </div>
          </div>
          <div className="flex gap-2 text-zinc-500">
            <Bell className="h-4 w-4" />
            <CircleUserRound className="h-4 w-4 text-green-400" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {["Proyectos", "Visitas", "Leads", "Deploys"].map((item, index) => (
            <div key={item} className="border border-white/10 bg-white/[0.04] p-3">
              <p className="text-[10px] text-zinc-500">{item}</p>
              <p className="mt-2 text-xl font-bold text-white">{[24, 1234, 57, 19][index]}</p>
              <p className="text-xs text-green-400">+{[12, 21, 8, 34][index]}%</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-[1.5fr_.8fr] gap-3">
          <div className="border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-5 flex items-center justify-between text-xs text-zinc-500">
              <span>Performance</span>
              <MoreHorizontal className="h-4 w-4" />
            </div>
            <svg viewBox="0 0 320 120" className="h-32 w-full overflow-visible">
              <path d="M0 95 C40 45 70 80 105 54 S168 72 205 35 S265 18 320 42" fill="none" stroke="#22C55E" strokeWidth="4" />
              <path d="M0 95 C40 45 70 80 105 54 S168 72 205 35 S265 18 320 42 L320 120 L0 120 Z" fill="url(#greenGraph)" opacity=".28" />
              <defs>
                <linearGradient id="greenGraph" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#22C55E" />
                  <stop offset="1" stopColor="#22C55E" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="border border-white/10 bg-white/[0.035] p-4">
            <Activity className="mb-5 h-5 w-5 text-green-400" />
            <div className="mx-auto h-28 w-28 rounded-full border-[18px] border-zinc-800 border-t-green-400 border-r-green-700" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-5 h-[270px] w-[150px] rotate-6 border border-white/15 bg-[#0d0d0d] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        <div className="mb-4 h-5 w-14 border border-white/10 bg-white/[0.04]" />
        <p className="text-xs text-zinc-500">Hola, Matias</p>
        <p className="mt-2 text-xl font-bold text-white">$12,456</p>
        <p className="text-xs text-green-400">+15.3%</p>
        <div className="mt-5 space-y-2">
          {[80, 62, 48, 72].map((width) => (
            <div key={width} className="h-8 border border-white/10 bg-white/[0.04] p-2">
              <div className="h-full bg-green-400/30" style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
