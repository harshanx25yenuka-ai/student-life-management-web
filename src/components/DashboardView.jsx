// client/src/components/DashboardView.jsx
import dayjs from "dayjs";

export default function DashboardView({ tasks, notes, schedules, studyPlans, exams, quote, fetchQuote, userName }) {
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const taskCompletionRate = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const todaySchedule = schedules.filter(s => s.day === daysOfWeek[new Date().getDay() - 1]);
  
  const upcomingTasks = [...tasks]
    .filter(t => t.dueDate && t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white">Welcome back, {userName.split(' ')[0]}! 👋</h2>
        <p className="text-gray-300 mt-1">Here's your academic overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <i className="fas fa-tasks text-blue-400 text-xl"></i>
            <span className="text-2xl font-bold text-white">{tasks.length}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Total Tasks</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <i className="fas fa-check-circle text-green-400 text-xl"></i>
            <span className="text-2xl font-bold text-white">{completedTasks}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Completed</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <i className="fas fa-calendar text-purple-400 text-xl"></i>
            <span className="text-2xl font-bold text-white">{schedules.length}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Classes</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <i className="fas fa-book text-orange-400 text-xl"></i>
            <span className="text-2xl font-bold text-white">{studyPlans.length}</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Study Sessions</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white/5 rounded-xl p-5 border border-white/10">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Task Completion</span>
          <span className="text-blue-400 font-semibold">{Math.round(taskCompletionRate)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all" style={{ width: `${taskCompletionRate}%` }}></div>
        </div>
      </div>

      {/* Motivation & Upcoming */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <i className="fas fa-quote-left text-2xl text-blue-400"></i>
            <h3 className="text-lg font-semibold text-white">Daily Motivation</h3>
          </div>
          <p className="text-gray-200 italic text-lg leading-relaxed">"{quote.text}"</p>
          <p className="text-gray-400 mt-3 text-right">— {quote.author}</p>
          <button onClick={fetchQuote} className="mt-4 text-sm text-blue-400 hover:text-blue-300">
            <i className="fas fa-sync-alt mr-1"></i> New Quote
          </button>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-clock text-blue-400"></i> Upcoming Tasks
          </h3>
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? upcomingTasks.map(t => (
              <div key={t.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{t.title}</p>
                  <p className="text-gray-400 text-xs">Due: {t.dueDate}</p>
                </div>
                <i className="fas fa-chevron-right text-gray-500 text-sm"></i>
              </div>
            )) : <p className="text-gray-400 text-center py-4">No pending tasks</p>}
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white/5 rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-calendar-day text-purple-400"></i> Today's Schedule
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {todaySchedule.length > 0 ? todaySchedule.map(s => (
            <div key={s.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.type === 'exam' ? 'bg-orange-500/20' : 'bg-blue-500/20'}`}>
                <i className={`fas ${s.type === 'exam' ? 'fa-pen' : 'fa-chalkboard-user'} text-lg ${s.type === 'exam' ? 'text-orange-400' : 'text-blue-400'}`}></i>
              </div>
              <div>
                <p className="text-white font-medium">{s.subject}</p>
                <p className="text-gray-400 text-sm">{s.time} • {s.type === 'exam' ? 'Exam' : 'Class'}</p>
              </div>
            </div>
          )) : <p className="text-gray-400 text-center py-4 col-span-2">No classes scheduled today</p>}
        </div>
      </div>
    </div>
  );
}