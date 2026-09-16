import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import BackgroundFX from "./components/BackgroundFX";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Plus, CheckCircle2, Circle, Trash2, Layers, Search, Sparkles } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskmatrix_tasks", [
    { id: 1, title: "Initialize Next-Gen TaskMatrix Pro Architecture", completed: true, priority: "High", createdAt: "9/16/2026" },
    { id: 2, title: "Configure Obsidian & Emerald Tailwind v4 Theme", completed: true, priority: "Medium", createdAt: "9/16/2026" },
    { id: 3, title: "Integrate Framer Motion Fluid Animations", completed: true, priority: "High", createdAt: "9/16/2026" },
    { id: 4, title: "Deploy Enterprise Workspace on Vercel", completed: false, priority: "High", createdAt: "9/16/2026" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Keyboard shortcut listener ('N' key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'n' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Memoized Handlers to prevent unnecessary re-renders
  const handleAddTask = useCallback((newTask) => {
    setTasks(prev => [newTask, ...prev]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  // Memoized Filtering & Search Calculation (Prevents heavy re-calculation on every render)
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      if (filter === "active") return !t.completed && matchesSearch;
      if (filter === "completed") return t.completed && matchesSearch;
      return matchesSearch;
    });
  }, [tasks, filter, searchQuery]);

  // Memoized Metrics Calculations
  const { total, completed, pending, completionPercentage } = useMemo(() => {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = totalCount - completedCount;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return { total: totalCount, completed: completedCount, pending: pendingCount, completionPercentage: percentage };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-hidden">

      {/* 3D Cursor-following Cosmic Blackhole Background FX */}
      <BackgroundFX />

      {/* Main UI layers */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header total={total} completed={completed} pending={pending} />

        <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex-1">

          {/* Pro Workspace Hero Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#070b14]/90 via-[#0b1329]/90 to-[#070b14]/90 backdrop-blur-xl border border-white/[0.08] p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5" /> Workspace Matrix Active
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Productivity Command Center</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage, prioritize, and track your execution pipeline seamlessly.</p>
              </div>

              {/* Progress Gauge */}
              <div className="bg-[#030712]/90 border border-white/10 rounded-xl p-4 min-w-[200px] backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400">Execution Rate</span>
                  <span className="text-emerald-400 font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center bg-[#070b14]/90 backdrop-blur-md border border-white/[0.08] rounded-xl px-3.5 py-3 focus-within:border-emerald-500/50 transition-all">
              <Search className="w-4 h-4 text-emerald-400/80 shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks in matrix..."
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>

            <div className="flex items-center justify-between gap-3 w-full">
              {/* Smooth Sliding Filter Pills */}
              <div className="flex items-center gap-1 bg-[#070b14]/90 backdrop-blur-md border border-white/[0.08] p-1 rounded-xl flex-1 relative">
                {['all', 'active', 'completed'].map((f) => {
                  const isActive = filter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`relative flex-1 py-1.5 text-center rounded-lg text-xs font-mono capitalize transition-colors cursor-pointer z-10 ${
                        isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeFilterPill"
                          className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/30 rounded-lg shadow-sm z-[-1]"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {f}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#030712] font-mono text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Task</span>
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-[#070b14]/40 backdrop-blur-md"
              >
                <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <h3 className="text-sm font-medium text-slate-300">No matching tasks found</h3>
                <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or create a new task.</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#070b14]/80 backdrop-blur-md border border-white/[0.08] hover:border-emerald-500/30 transition-all group shadow-md hover:shadow-emerald-500/5"
                  >
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                        )}
                      </button>
                      <div>
                        <h4 className={`text-sm font-medium transition-colors ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                            task.priority === 'High'
                              ? 'bg-red-500/10 text-red-400 border-red-500/20'
                              : task.priority === 'Medium'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {task.priority}
                          </span>
                          {task.createdAt && (
                            <span className="text-[10px] font-mono text-slate-500">{task.createdAt}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}