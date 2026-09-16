import { useState } from "react";
import { X, Plus, Sparkles, AlertCircle } from "lucide-react";

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    onAddTask({
      id: Date.now(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date().toLocaleDateString()
    });

    // Reset and close
    setTitle("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#070b14] border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
        
        {/* Glow Decorator */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Create New Task</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
              Task Title
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g., Optimize React build pipeline..."
              className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-sans"
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" /> {error}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
              Priority Matrix
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-2 text-xs font-mono rounded-xl border transition-all ${
                    priority === p 
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10' 
                      : 'bg-[#030712] border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-emerald-500 hover:bg-emerald-400 text-obsidian shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Task
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}