// client/src/pages/Login.jsx - Direct Supabase (no backend)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, setCurrentUserId } from "../api";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
    if (!mobile || !password) {
      alert("Please enter mobile and password");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/users/login", { mobile, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setCurrentUserId(res.data.user.id);
      nav("/home");
    } catch (err) {
      alert(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <i className="fas fa-graduation-cap text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Student Life Organizer</p>
          <p className="text-xs text-green-400 mt-2">✓ Connected to Supabase</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
            <input
              type="tel"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <button onClick={() => nav("/register")} className="text-blue-400 hover:text-blue-300 font-medium">
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}