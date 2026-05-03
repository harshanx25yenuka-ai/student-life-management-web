// client/src/components/Navbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getUserName } from "../auth";

export default function Navbar({ activeTab, setActiveTab }) {
  const nav = useNavigate();
  const userName = getUserName();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "fa-chart-line" },
    { id: "tasks", label: "Tasks", icon: "fa-check-circle" },
    { id: "notes", label: "Notes", icon: "fa-note-sticky" },
    { id: "calendar", label: "Calendar", icon: "fa-calendar-alt" },
    { id: "study", label: "Study Planner", icon: "fa-book-open" }
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <span className="text-white font-bold text-lg">StudentHub</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-blue-400"></i>
            </div>
            <div>
              <p className="text-white font-medium">{userName}</p>
              <p className="text-gray-400 text-xs">Student</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={() => { logout(); nav("/login"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
            >
              <i className="fas fa-sign-out-alt w-5"></i>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <span className="text-white font-bold text-xl">StudentHub</span>
              <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">University Suite</span>
            </div>
            <div className="flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{userName}</p>
                  <p className="text-gray-400 text-xs">Student</p>
                </div>
                <div className="w-9 h-9 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-blue-400"></i>
                </div>
              </div>
              <button
                onClick={() => { logout(); nav("/login"); }}
                className="text-gray-400 hover:text-red-400 transition-all px-3 py-2"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="text-white">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-sm"></i>
              </div>
              <span className="text-white font-bold">StudentHub</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-blue-400 text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}