// client/src/services/DataService.js
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG, BACKEND_URL } from '../config';

class DataService {
  constructor() {
    this.backendAvailable = true;
    this.supabase = null;
    this.currentUserId = null;
    this.initSupabase();
    this.checkBackendConnection();
  }

  initSupabase() {
    try {
      this.supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      console.log('Supabase client initialized');
    } catch (error) {
      console.error('Failed to initialize Supabase:', error);
    }
  }

  async checkBackendConnection() {
    try {
      await axios.get(`${BACKEND_URL.replace('/api', '')}/api/health`, { timeout: 3000 });
      this.backendAvailable = true;
      console.log('✅ Backend connected');
    } catch (error) {
      this.backendAvailable = false;
      console.log('⚠️ Backend not available, using Supabase fallback');
    }
  }

  setUserId(userId) {
    this.currentUserId = userId;
  }

  // ============ TASKS ============
  async getTasks() {
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/tasks`);
        return res.data;
      } catch (error) {
        console.log('Backend failed, falling back to Supabase');
        this.backendAvailable = false;
      }
    }
    
    // Supabase fallback
    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .eq('userId', this.currentUserId)
      .order('dueDate', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async addTask(task) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/tasks`, { ...task, userId: this.currentUserId });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('tasks')
      .insert([{ ...task, userId: this.currentUserId, status: 'pending', reminded: false }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async updateTaskStatus(id, status) {
    if (this.backendAvailable) {
      try {
        const res = await axios.put(`${BACKEND_URL}/tasks/${id}`, { status });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteTask(id) {
    if (this.backendAvailable) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/tasks/${id}`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ============ NOTES ============
  async getNotes() {
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/notes`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('userId', this.currentUserId)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async addNote(note) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/notes`, { ...note, userId: this.currentUserId });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('notes')
      .insert([{ ...note, userId: this.currentUserId, createdAt: new Date().toISOString() }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteNote(id) {
    if (this.backendAvailable) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/notes/${id}`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ============ SCHEDULES ============
  async getSchedules() {
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/schedules`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('schedules')
      .select('*')
      .eq('userId', this.currentUserId)
      .order('day', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async addSchedule(schedule) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/schedules`, { ...schedule, userId: this.currentUserId });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('schedules')
      .insert([{ ...schedule, userId: this.currentUserId, type: schedule.type || 'class' }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteSchedule(id) {
    if (this.backendAvailable) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/schedules/${id}`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('schedules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ============ EXAMS ============
  async getExams() {
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/exams`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('exams')
      .select('*')
      .eq('userId', this.currentUserId)
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async addExam(exam) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/exams`, { ...exam, userId: this.currentUserId });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('exams')
      .insert([{ ...exam, userId: this.currentUserId, reminded: false }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteExam(id) {
    if (this.backendAvailable) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/exams/${id}`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('exams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ============ STUDY PLANS ============
  async getStudyPlans() {
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/study-plans`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('study_plans')
      .select('*')
      .eq('userId', this.currentUserId)
      .order('day', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  async addStudyPlan(plan) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/study-plans`, { ...plan, userId: this.currentUserId });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { data, error } = await this.supabase
      .from('study_plans')
      .insert([{ ...plan, userId: this.currentUserId }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteStudyPlan(id) {
    if (this.backendAvailable) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/study-plans/${id}`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    const { error } = await this.supabase
      .from('study_plans')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // ============ USER AUTH ============
  async login(mobile, password) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/login`, { mobile, password });
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    // Supabase fallback login
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('mobile', mobile)
      .eq('password', password);
    
    if (error) throw error;
    if (data.length === 0) throw new Error('Invalid credentials');
    
    return { user: { id: data[0].id, name: `${data[0].firstName} ${data[0].lastName}`, mobile: data[0].mobile } };
  }

  async register(userData) {
    if (this.backendAvailable) {
      try {
        const res = await axios.post(`${BACKEND_URL}/users/register`, userData);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    // Check if user exists
    const { data: existing } = await this.supabase
      .from('users')
      .select('id')
      .eq('mobile', userData.mobile);
    
    if (existing.length > 0) throw new Error('Mobile already exists');
    
    // Create user
    const { data, error } = await this.supabase
      .from('users')
      .insert([userData])
      .select();
    
    if (error) throw error;
    return { message: 'User registered successfully', userId: data[0].id };
  }

  // ============ QUOTES ============
  async getRandomQuote() {
    const quotes = [
      { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
      { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward" },
      { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
      { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
      { text: "Strive for progress, not perfection.", author: "Unknown" },
      { text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar" }
    ];
    
    if (this.backendAvailable) {
      try {
        const res = await axios.get(`${BACKEND_URL}/quotes/random`);
        return res.data;
      } catch (error) {
        this.backendAvailable = false;
      }
    }
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

export default new DataService();