// client/src/components/NotesView.jsx
import { useState } from "react";
import dayjs from "dayjs";

export default function NotesView({ notes, onAddNote, onDeleteNote }) {
  const [noteForm, setNoteForm] = useState({ title: "", content: "" });

  const handleSubmit = () => {
    if (!noteForm.title) return alert("Title required");
    onAddNote(noteForm);
    setNoteForm({ title: "", content: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-pen text-yellow-400"></i> Add New Note
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Note Title" 
            value={noteForm.title} 
            onChange={e => setNoteForm({...noteForm, title: e.target.value})} 
          />
          <textarea 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Content" 
            rows="2" 
            value={noteForm.content} 
            onChange={e => setNoteForm({...noteForm, content: e.target.value})}
          ></textarea>
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={handleSubmit}>
          Save Note
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map(n => (
          <div key={n.id} className="bg-white/5 rounded-xl p-5 border border-white/10 group hover:border-yellow-500/30 transition-all">
            <div className="flex justify-between items-start">
              <h4 className="text-white font-semibold">{n.title}</h4>
              <button onClick={() => onDeleteNote(n.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2 line-clamp-3">{n.content}</p>
            <p className="text-gray-500 text-xs mt-3">{dayjs(n.createdAt).format("MMM D, YYYY")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}