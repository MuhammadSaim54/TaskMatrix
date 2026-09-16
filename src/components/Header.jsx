import { CheckCircle2, Clock, ListTodo, Sparkles } from "lucide-react";

export default function Header({ total, completed, pending }) {
  return (
    <header className="w-full border-b border-white/[0.08] bg-[#070b14]/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">TaskMatrix</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold">PRO</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">Next-Gen Workspace & Productivity Matrix</p>
          </div>
        </div>

        {/* Live Telemetry / Stats Badges */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#030712] border border-white/[0.08] rounded-xl px-4 py-2 shadow-inner">
          <div className="flex items-center gap-2 pr-3 border-r border-white/10 text-xs font-mono text-slate-300">
            <ListTodo className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Total: <strong className="text-white">{total}</strong></span>
          </div>
          
          <div className="flex items-center gap-2 px-2 sm:px-3 border-r border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Pending: <strong className="text-amber-400">{pending}</strong></span>
          </div>

          <div className="flex items-center gap-2 pl-1 sm:pl-2 text-xs font-mono text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Done: <strong className="text-emerald-400">{completed}</strong></span>
          </div>
        </div>

      </div>
    </header>
  );
}