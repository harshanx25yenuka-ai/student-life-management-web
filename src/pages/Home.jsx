// client/src/pages/Home.jsx
import { useEffect, useState, useCallback } from "react";
import { API, setCurrentUserId } from "../api";
import { getUserId, getUserName } from "../auth";
import Navbar from "../components/Navbar";
import DashboardView from "../components/DashboardView";
import TasksView from "../components/TasksView";
import NotesView from "../components/NotesView";
import CalendarView from "../components/CalendarView";
import StudyPlannerView from "../components/StudyPlannerView";

export default function Home() {
  const userId = getUserId();
  const userName = getUserName();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);
  const [exams, setExams] = useState([]);
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
    }
  }, [userId]);

  const requestPermission = () => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  };

  const checkReminders = useCallback((tasksList, examsList) => {
    const today = new Date().toISOString().split("T")[0];
    tasksList.forEach((task) => {
      if (task.dueDate === today && task.status !== "completed") {
        new Notification("📚 Task Due Today", { body: task.title });
      }
    });
    examsList.forEach((exam) => {
      if (exam.date === today) {
        new Notification("📝 Exam Today!", { body: `${exam.title} at ${exam.location || "TBA"}` });
      }
    });
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const [t, n, s, sp, e] = await Promise.all([
        API.get("/tasks"),
        API.get("/notes"),
        API.get("/schedules"),
        API.get("/study-plans"),
        API.get("/exams")
      ]);
      setTasks(t.data);
      setNotes(n.data);
      setSchedules(s.data);
      setStudyPlans(sp.data);
      setExams(e.data);
      checkReminders(t.data, e.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [checkReminders]);

  const fetchQuote = async () => {
    try {
      const res = await API.get("/quotes/random");
      setQuote(res.data);
    } catch (error) {
      setQuote({ text: "The secret of getting ahead is getting started.", author: "Mark Twain" });
    }
  };

  useEffect(() => {
    requestPermission();
    fetchAll();
    fetchQuote();
    const interval = setInterval(fetchAll, 3600000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const addTask = async (taskData) => {
    await API.post("/tasks", { ...taskData, userId });
    fetchAll();
  };
  
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchAll();
  };
  
  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await API.put(`/tasks/${id}`, { status: newStatus });
    fetchAll();
  };
  
  const addNote = async (noteData) => {
    await API.post("/notes", { ...noteData, userId });
    fetchAll();
  };
  
  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchAll();
  };
  
  const addSchedule = async (scheduleData) => {
    await API.post("/schedules", { ...scheduleData, userId });
    fetchAll();
  };
  
  const deleteSchedule = async (id) => {
    await API.delete(`/schedules/${id}`);
    fetchAll();
  };
  
  const addExam = async (examData) => {
    await API.post("/exams", { ...examData, userId });
    fetchAll();
  };
  
  const deleteExam = async (id) => {
    await API.delete(`/exams/${id}`);
    fetchAll();
  };
  
  const addStudyPlan = async (planData) => {
    await API.post("/study-plans", { ...planData, userId });
    fetchAll();
  };
  
  const deleteStudyPlan = async (id) => {
    await API.delete(`/study-plans/${id}`);
    fetchAll();
  };

  return (
    <div className="min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-16 lg:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {activeTab === "dashboard" && (
            <DashboardView 
              tasks={tasks}
              notes={notes}
              schedules={schedules}
              studyPlans={studyPlans}
              exams={exams}
              quote={quote}
              fetchQuote={fetchQuote}
              userName={userName}
            />
          )}
          
          {activeTab === "tasks" && (
            <TasksView 
              tasks={tasks}
              onAddTask={addTask}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTaskStatus}
            />
          )}
          
          {activeTab === "notes" && (
            <NotesView 
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          )}
          
          {activeTab === "calendar" && (
            <CalendarView 
              tasks={tasks}
              exams={exams}
              schedules={schedules}
              onAddExam={addExam}
              onDeleteExam={deleteExam}
              onAddSchedule={addSchedule}
              onDeleteSchedule={deleteSchedule}
            />
          )}
          
          {activeTab === "study" && (
            <StudyPlannerView 
              studyPlans={studyPlans}
              onAddStudyPlan={addStudyPlan}
              onDeleteStudyPlan={deleteStudyPlan}
            />
          )}
        </div>
      </main>
    </div>
  );
}