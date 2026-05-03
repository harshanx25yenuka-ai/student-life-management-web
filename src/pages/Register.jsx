// client/src/pages/Register.jsx - Direct Supabase (no backend)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.mobile || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await API.post("/users/register", form);
      alert("Account Created Successfully!");
      nav("/login");
    } catch (err) {
      alert(err.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <i className="fas fa-user-plus text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2">Join Student Life Organizer</p>
          <p className="text-xs text-green-400 mt-2">✓ Connected to Supabase</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First Name"
              className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.firstName}
              onChange={e => setForm({...form, firstName: e.target.value})}
            />
            <input
              placeholder="Last Name"
              className="px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              value={form.lastName}
              onChange={e => setForm({...form, lastName: e.target.value})}
            />
          </div>
          <input
            placeholder="Mobile Number"
            type="tel"
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            value={form.mobile}
            onChange={e => setForm({...form, mobile: e.target.value})}
          />
          <input
            placeholder="Email Address"
            type="email"
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <button onClick={() => nav("/login")} className="text-blue-400 hover:text-blue-300 font-medium">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}