import { useState } from "react";
import Header from "./components/Header";
import TaskModal from "./components/TaskModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Plus, CheckCircle2, Circle, Trash2, Layers } from "lucide-react";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskmatrix_tasks", [
    { id: 1, title: "Initialize Next-Gen TaskMatrix Pro", completed: true, priority: "High" },
    { id: 2, title: "Setup Tailwind Obsidian & Emerald Theme", completed: true, priority: "Medium" },
    { id: 3, title: "Build Task Creation Modal & Form", completed: false, priority: "High" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'completed'

  // Task Handlers
  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col font-sans">
      {/* Header with Live Telemetry */}
      <Header total={total} completed={completed} pending={pending} />

      {/* Main Workspace */}
      <main className="max-w-5xl mx-auto w-full px-6 py-8 flex-1">
        
        {/* Action Bar / Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Filters */}
          <div className="flex items-center gap-1 bg-[#070b14] border border-white/[0.08] p-1 rounded-xl w-full sm:w-auto">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                  filter === f 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Add Task Trigger Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#030712] font-mono text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>

        {/* Tasks List Container */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-[#070b14]/30">
              <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-slate-300">No tasks found in this matrix</h3>
              <p className="text-xs text-slate-500 mt-1">Create a new task to get started.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#070b14] border border-white/[0.08] hover:border-white/20 transition-all group"
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
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </main>

      {/* Task Modal Component */}
      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}