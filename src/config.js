// client/src/config.js
// Supabase configuration - Add your Supabase credentials here
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://qeteyfiutignsgjchowj.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldGV5Zml1dGlnbnNnamNob3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTUxMzEsImV4cCI6MjA5Mjc5MTEzMX0.PdocPQeBGBw2Pt4hILZWPxYmqy3yx6f2HOogvdgwlb0'
};

export const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';