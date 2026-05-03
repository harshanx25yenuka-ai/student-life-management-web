// client/src/components/TasksView.jsx
import { useState } from "react";

export default function TasksView({ tasks, onAddTask, onDeleteTask, onToggleTask }) {
  const [taskForm, setTaskForm] = useState({ title: "", description: "", dueDate: "" });

  const handleSubmit = () => {
    if (!taskForm.title) return alert("Title required");
    onAddTask(taskForm);
    setTaskForm({ title: "", description: "", dueDate: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-plus-circle text-green-400"></i> Add New Task
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Task Title" 
            value={taskForm.title} 
            onChange={e => setTaskForm({...taskForm, title: e.target.value})} 
          />
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Description" 
            value={taskForm.description} 
            onChange={e => setTaskForm({...taskForm, description: e.target.value})} 
          />
          <input 
            type="date" 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" 
            value={taskForm.dueDate} 
            onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})} 
          />
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={handleSubmit}>
          Create Task
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map(t => (
          <div key={t.id} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <input 
                  type="checkbox" 
                  checked={t.status === "completed"} 
                  onChange={() => onToggleTask(t.id, t.status)} 
                  className="mt-1 w-5 h-5 accent-blue-500" 
                />
                <div className="flex-1">
                  <h4 className={`text-white font-semibold ${t.status === "completed" ? "line-through text-gray-400" : ""}`}>{t.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{t.description || "No description"}</p>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><i className="fas fa-calendar-alt"></i> Due: {t.dueDate}</p>
                </div>
              </div>
              <button onClick={() => onDeleteTask(t.id)} className="text-red-400 hover:text-red-300 transition-all p-1">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}