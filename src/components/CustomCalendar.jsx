// client/src/components/CustomCalendar.jsx
import { useState } from "react";
import dayjs from "dayjs";

export default function CustomCalendar({ selectedDate, onDateChange, tasks, exams }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
  
  const isToday = (date) => {
    return formatDate(date) === dayjs().format("YYYY-MM-DD");
  };
  
  const isSelected = (date) => {
    return formatDate(date) === formatDate(selectedDate);
  };
  
  const hasTask = (date) => {
    return tasks.some(t => t.dueDate === formatDate(date));
  };
  
  const hasExam = (date) => {
    return exams.some(e => e.date === formatDate(date));
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }
  
  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/10">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrevMonth}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="text-xl font-semibold text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button 
          onClick={handleNextMonth}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map(day => (
          <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square rounded-xl bg-transparent"></div>;
          }
          
          const isSelectedDate = isSelected(date);
          const isTodayDate = isToday(date);
          const hasTaskDate = hasTask(date);
          const hasExamDate = hasExam(date);
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateChange(date)}
              className={`
                aspect-square rounded-xl font-medium transition-all relative
                ${isSelectedDate 
                  ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30' 
                  : isTodayDate
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }
              `}
            >
              <span>{date.getDate()}</span>
              {(hasTaskDate || hasExamDate) && !isSelectedDate && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {hasTaskDate && <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>}
                  {hasExamDate && <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>}
                </div>
              )}
              {(hasTaskDate || hasExamDate) && isSelectedDate && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {hasTaskDate && <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>}
                  {hasExamDate && <div className="w-1.5 h-1.5 rounded-full bg-orange-300"></div>}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}