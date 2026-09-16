export default function Logo({ className = "w-9 h-9" }) {
  return (
    <div className={`${className} relative rounded-xl bg-[#070b14] border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 overflow-hidden shrink-0`}>
      {/* Inner Glowing Core */}
      <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-sm" />
      
      {/* Geometric Pro Node Structure */}
      <div className="relative w-3.5 h-3.5 rotate-45 border-2 border-emerald-400 rounded-[3px] flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.6)]">
        <div className="w-1 h-1 bg-emerald-300 rounded-full animate-pulse" />
      </div>
    </div>
  );
}