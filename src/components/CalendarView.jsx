// client/src/components/CalendarView.jsx
import { useState } from "react";
import dayjs from "dayjs";
import CustomCalendar from "./CustomCalendar";

export default function CalendarView({ tasks, exams, schedules, onAddExam, onDeleteExam, onAddSchedule, onDeleteSchedule }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [examForm, setExamForm] = useState({ title: "", date: "", location: "" });
  const [scheduleForm, setScheduleForm] = useState({ subject: "", day: "", time: "", type: "class" });
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
  const getTasksForDate = (date) => tasks.filter(t => t.dueDate === formatDate(date));
  const getExamsForDate = (date) => exams.filter(e => e.date === formatDate(date));

  const handleAddExam = () => {
    if (!examForm.title || !examForm.date) return alert("Title and date required");
    onAddExam(examForm);
    setExamForm({ title: "", date: "", location: "" });
  };

  const handleAddSchedule = () => {
    if (!scheduleForm.subject || !scheduleForm.day || !scheduleForm.time) {
      return alert("Please fill all fields");
    }
    onAddSchedule(scheduleForm);
    setScheduleForm({ subject: "", day: "", time: "", type: "class" });
  };

  return (
    <div className="space-y-6">
      {/* Custom Calendar */}
      <CustomCalendar 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        tasks={tasks}
        exams={exams}
      />

      {/* Legend */}
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="text-gray-300 text-sm">Task Due</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <span className="text-gray-300 text-sm">Exam Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-gray-300 text-sm">Today</span>
        </div>
      </div>

      {/* Tasks and Exams for Selected Date */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-tasks text-blue-400"></i> Tasks on {dayjs(selectedDate).format("MMMM D, YYYY")}
          </h3>
          {getTasksForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getTasksForDate(selectedDate).map(t => (
                <div key={t.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <i className="fas fa-check-circle text-blue-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{t.title}</p>
                      <p className="text-gray-400 text-sm">{t.description || "No description"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-calendar-check text-4xl text-gray-600 mb-3"></i>
              <p className="text-gray-400">No tasks scheduled for this day</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-pen text-orange-400"></i> Exams on {dayjs(selectedDate).format("MMMM D, YYYY")}
          </h3>
          {getExamsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getExamsForDate(selectedDate).map(e => (
                <div key={e.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <i className="fas fa-graduation-cap text-orange-400 text-sm"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{e.title}</p>
                      <p className="text-gray-400 text-sm">📍 {e.location || "Location TBA"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fas fa-calendar-week text-4xl text-gray-600 mb-3"></i>
              <p className="text-gray-400">No exams scheduled for this day</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Exam Section */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-calendar-plus text-purple-400"></i> Add New Exam / Event
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Exam Title" 
            value={examForm.title} 
            onChange={e => setExamForm({...examForm, title: e.target.value})} 
          />
          <input 
            type="date" 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500" 
            value={examForm.date} 
            onChange={e => setExamForm({...examForm, date: e.target.value})} 
          />
          <input 
            className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" 
            placeholder="Location / Venue" 
            value={examForm.location} 
            onChange={e => setExamForm({...examForm, location: e.target.value})} 
          />
        </div>
        <button className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={handleAddExam}>
          Add Exam
        </button>
      </div>

      {/* Class Schedule Section */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-chalkboard-user text-green-400"></i> Weekly Class Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {daysOfWeek.map(day => (
            <div key={day} className="bg-black/30 rounded-xl p-4">
              <h4 className="text-blue-400 font-semibold border-b border-white/10 pb-2 mb-3">{day}</h4>
              {schedules.filter(s => s.day === day).map(s => (
                <div key={s.id} className="p-2 bg-white/5 rounded-lg mb-2">
                  <p className="text-white text-sm font-medium">{s.subject}</p>
                  <p className="text-gray-400 text-xs">{s.time}</p>
                  <button onClick={() => onDeleteSchedule(s.id)} className="text-red-400 text-xs mt-1 hover:text-red-300">Remove</button>
                </div>
              ))}
              {schedules.filter(s => s.day === day).length === 0 && (
                <p className="text-gray-500 text-xs text-center py-2">No classes</p>
              )}
            </div>
          ))}
        </div>
        
        {/* Add Class Form */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <i className="fas fa-plus-circle text-green-400"></i> Add New Class
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <input 
              className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" 
              placeholder="Subject" 
              value={scheduleForm.subject} 
              onChange={e => setScheduleForm({...scheduleForm, subject: e.target.value})} 
            />
            <select 
              className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500" 
              value={scheduleForm.day} 
              onChange={e => setScheduleForm({...scheduleForm, day: e.target.value})}
            >
              <option value="">Select Day</option>
              {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <input 
              className="px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500" 
              placeholder="Time (e.g., 10:00 AM)" 
              value={scheduleForm.time} 
              onChange={e => setScheduleForm({...scheduleForm, time: e.target.value})} 
            />
            <button className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm hover:bg-blue-700 transition-all" onClick={handleAddSchedule}>
              Add Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}