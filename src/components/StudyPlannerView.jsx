// client/src/components/StudyPlannerView.jsx
import { useState } from "react";

export default function StudyPlannerView({ studyPlans, onAddStudyPlan, onDeleteStudyPlan }) {
  const [studyPlanForm, setStudyPlanForm] = useState({ subject: "", day: "", startTime: "", endTime: "" });
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const getStudyPlanForDay = (day) => studyPlans.filter(sp => sp.day === day);

  const handleSubmit = () => {
    if (!studyPlanForm.subject || !studyPlanForm.day || !studyPlanForm.startTime) {
      return alert("Please fill required fields");
    }
    onAddStudyPlan(studyPlanForm);
    setStudyPlanForm({ subject: "", day: "", startTime: "", endTime: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-plus-circle text-green-400"></i> Create Study Session
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Subject" 
            value={studyPlanForm.subject} 
            onChange={e => setStudyPlanForm({...studyPlanForm, subject: e.target.value})} 
          />
          <select 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" 
            value={studyPlanForm.day} 
            onChange={e => setStudyPlanForm({...studyPlanForm, day: e.target.value})}
          >
            <option value="">Select Day</option>
            {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input 
            type="time" 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" 
            placeholder="Start Time" 
            value={studyPlanForm.startTime} 
            onChange={e => setStudyPlanForm({...studyPlanForm, startTime: e.target.value})} 
          />
          <input 
            type="time" 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" 
            placeholder="End Time" 
            value={studyPlanForm.endTime} 
            onChange={e => setStudyPlanForm({...studyPlanForm, endTime: e.target.value})} 
          />
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={handleSubmit}>
          Add Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map(day => {
          const plans = getStudyPlanForDay(day);
          return (
            <div key={day} className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-semibold text-blue-400 border-b border-white/10 pb-2 mb-3">{day}</h3>
              {plans.length > 0 ? plans.map(p => (
                <div key={p.id} className="p-3 bg-black/30 rounded-lg mb-2">
                  <p className="text-white font-medium">{p.subject}</p>
                  <p className="text-gray-400 text-sm">{p.startTime} {p.endTime ? `- ${p.endTime}` : ''}</p>
                  <button onClick={() => onDeleteStudyPlan(p.id)} className="text-red-400 text-xs mt-1 hover:text-red-300">
                    Remove
                  </button>
                </div>
              )) : <p className="text-gray-500 text-sm text-center py-4">No study sessions</p>}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-lightbulb text-yellow-400"></i> Study Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-2">
            <i className="fas fa-hourglass-half text-blue-400"></i>
            <span className="text-gray-300">Use Pomodoro Technique: 25 min study, 5 min break</span>
          </div>
          <div className="flex items-center gap-3 p-2">
            <i className="fas fa-brain text-purple-400"></i>
            <span className="text-gray-300">Active recall &lt Passive reading</span>
          </div>
          <div className="flex items-center gap-3 p-2">
            <i className="fas fa-moon text-indigo-400"></i>
            <span className="text-gray-300">Get 7-8 hours of sleep for memory consolidation</span>
          </div>
          <div className="flex items-center gap-3 p-2">
            <i className="fas fa-mobile-alt text-red-400"></i>
            <span className="text-gray-300">Eliminate distractions while studying</span>
          </div>
        </div>
      </div>
    </div>
  );
}