import { CheckCircle2, Clock, ListTodo, Sparkles } from "lucide-react";

export default function Header({ total, completed, pending }) {
  return (
    <header className="w-full border-b border-white/[0.08] bg-[#070b14]/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-6 py-3.5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">TaskMatrix</h1>
                <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-semibold">PRO</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono">Next-Gen Workspace Matrix</p>
            </div>
          </div>
        </div>

        {/* Live Telemetry / Stats Badges */}
        <div className="flex items-center justify-around sm:justify-end w-full sm:w-auto gap-2 bg-[#030712] border border-white/[0.08] rounded-xl px-3 py-2 shadow-inner">
          <div className="flex items-center gap-1.5 pr-2 sm:pr-3 border-r border-white/10 text-[11px] sm:text-xs font-mono text-slate-300">
            <ListTodo className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
            <span>Total: <strong className="text-white">{total}</strong></span>
          </div>
          
          <div className="flex items-center gap-1.5 px-1 sm:px-3 border-r border-white/10 text-[11px] sm:text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span>Pending: <strong className="text-amber-400">{pending}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 pl-1 sm:pl-2 text-[11px] sm:text-xs font-mono text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
            <span>Done: <strong className="text-emerald-400">{completed}</strong></span>
          </div>
        </div>

      </div>
    </header>
  );
}