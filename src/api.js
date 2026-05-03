// client/src/api.js - Direct Supabase only
import SupabaseService from './services/SupabaseService';

export const API = {
  get: async (url) => {
    if (url === '/tasks') return { data: await SupabaseService.getTasks() };
    if (url === '/notes') return { data: await SupabaseService.getNotes() };
    if (url === '/schedules') return { data: await SupabaseService.getSchedules() };
    if (url === '/exams') return { data: await SupabaseService.getExams() };
    if (url === '/study-plans') return { data: await SupabaseService.getStudyPlans() };
    if (url === '/quotes/random') return { data: await SupabaseService.getRandomQuote() };
    throw new Error(`Unknown GET endpoint: ${url}`);
  },
  
  post: async (url, data) => {
    if (url === '/tasks') return { data: await SupabaseService.addTask(data) };
    if (url === '/notes') return { data: await SupabaseService.addNote(data) };
    if (url === '/schedules') return { data: await SupabaseService.addSchedule(data) };
    if (url === '/exams') return { data: await SupabaseService.addExam(data) };
    if (url === '/study-plans') return { data: await SupabaseService.addStudyPlan(data) };
    if (url === '/users/login') return { data: await SupabaseService.login(data.mobile, data.password) };
    if (url === '/users/register') return { data: await SupabaseService.register(data) };
    throw new Error(`Unknown POST endpoint: ${url}`);
  },
  
  put: async (url, data) => {
    const match = url.match(/\/tasks\/(\d+)/);
    if (match) {
      return { data: await SupabaseService.updateTaskStatus(match[1], data.status) };
    }
    throw new Error(`Unknown PUT endpoint: ${url}`);
  },
  
  delete: async (url) => {
    if (url.includes('/tasks/')) {
      const id = url.split('/').pop();
      return { data: await SupabaseService.deleteTask(id) };
    }
    if (url.includes('/notes/')) {
      const id = url.split('/').pop();
      return { data: await SupabaseService.deleteNote(id) };
    }
    if (url.includes('/schedules/')) {
      const id = url.split('/').pop();
      return { data: await SupabaseService.deleteSchedule(id) };
    }
    if (url.includes('/exams/')) {
      const id = url.split('/').pop();
      return { data: await SupabaseService.deleteExam(id) };
    }
    if (url.includes('/study-plans/')) {
      const id = url.split('/').pop();
      return { data: await SupabaseService.deleteStudyPlan(id) };
    }
    throw new Error(`Unknown DELETE endpoint: ${url}`);
  }
};

export const setCurrentUserId = (userId) => {
  SupabaseService.setUserId(userId);
};

export const getCurrentUserId = () => {
  return SupabaseService.getUserId();
};