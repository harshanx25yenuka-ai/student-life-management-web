// client/src/services/SupabaseService.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials! Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    },
  },
});

class SupabaseService {
  constructor() {
    this.currentUserId = null;
  }

  setUserId(userId) {
    this.currentUserId = userId;
    localStorage.setItem('supabaseUserId', userId);
  }

  getUserId() {
    if (!this.currentUserId) {
      this.currentUserId = localStorage.getItem('supabaseUserId');
    }
    return this.currentUserId;
  }

  async login(mobile, password) {
    try {
      console.log('Attempting login with mobile:', mobile);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('mobile', mobile)
        .eq('password', password);
      
      if (error) {
        console.error('Supabase query error:', error);
        throw new Error(error.message);
      }
      
      if (!data || data.length === 0) {
        throw new Error('Invalid mobile number or password');
      }
      
      const user = data[0];
      this.setUserId(user.id);
      
      return { 
        user: { 
          id: user.id, 
          name: `${user.firstName} ${user.lastName}`, 
          mobile: user.mobile 
        } 
      };
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  }

  async register(userData) {
    try {
      console.log('Attempting registration for mobile:', userData.mobile);
      
      // Check if user exists
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('mobile', userData.mobile);
      
      if (checkError) {
        console.error('Check user error:', checkError);
      }
      
      if (existing && existing.length > 0) {
        throw new Error('Mobile number already registered');
      }
      
      // Insert new user
      const { data, error } = await supabase
        .from('users')
        .insert([{
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile,
          email: userData.email,
          password: userData.password
        }])
        .select();
      
      if (error) {
        console.error('Insert error:', error);
        throw new Error(error.message);
      }
      
      if (!data || data.length === 0) {
        throw new Error('Registration failed - no data returned');
      }
      
      console.log('Registration successful for user ID:', data[0].id);
      return { message: 'User registered successfully', userId: data[0].id };
    } catch (err) {
      console.error('Registration failed:', err);
      throw err;
    }
  }

  // ... rest of the methods remain the same as before
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('userId', this.getUserId())
      .order('dueDate', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addTask(task) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ 
        ...task, 
        userId: this.getUserId(), 
        status: 'pending', 
        reminded: false 
      }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async updateTaskStatus(id, status) {
    const { error } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async deleteTask(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async getNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('userId', this.getUserId())
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async addNote(note) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ 
        ...note, 
        userId: this.getUserId(), 
        createdAt: new Date().toISOString() 
      }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteNote(id) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async getSchedules() {
    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('userId', this.getUserId())
      .order('day', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addSchedule(schedule) {
    const { data, error } = await supabase
      .from('schedules')
      .insert([{ 
        ...schedule, 
        userId: this.getUserId(), 
        type: schedule.type || 'class' 
      }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteSchedule(id) {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async getExams() {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('userId', this.getUserId())
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addExam(exam) {
    const { data, error } = await supabase
      .from('exams')
      .insert([{ 
        ...exam, 
        userId: this.getUserId(), 
        reminded: false 
      }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteExam(id) {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async getStudyPlans() {
    const { data, error } = await supabase
      .from('study_plans')
      .select('*')
      .eq('userId', this.getUserId())
      .order('day', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addStudyPlan(plan) {
    const { data, error } = await supabase
      .from('study_plans')
      .insert([{ 
        ...plan, 
        userId: this.getUserId() 
      }])
      .select();
    
    if (error) throw error;
    return data;
  }

  async deleteStudyPlan(id) {
    const { error } = await supabase
      .from('study_plans')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }

  async getRandomQuote() {
    const quotes = [
      { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
      { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Study while others are sleeping; work while others are loafing.", author: "William A. Ward" },
      { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
      { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" }
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

export default new SupabaseService();