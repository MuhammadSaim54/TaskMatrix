import { useState } from "react";
import Header from "./components/Header";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  // Temporary sample tasks state using our useLocalStorage hook
  const [tasks, setTasks] = useLocalStorage("taskmatrix_tasks", [
    { id: 1, title: "Initialize Next-Gen TaskMatrix Pro", completed: true, priority: "High" },
    { id: 2, title: "Setup Tailwind Obsidian & Emerald Theme", completed: true, priority: "Medium" },
    { id: 3, title: "Build Task Modal & Input Form", completed: false, priority: "High" }
  ]);

  // Calculate live statistics
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* Header with Live Telemetry */}
      <Header total={total} completed={completed} pending={pending} />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto w-full px-6 py-8 flex-1">
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-obsidian-card/30">
          <h2 className="text-lg font-medium text-slate-300">Workspace is Active 🚀</h2>
          <p className="text-sm text-slate-500 mt-1">Header and state hook are successfully linked. Ready for the next component!</p>
        </div>
      </main>
    </div>
  );
}