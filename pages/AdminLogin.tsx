
import React, { useState } from 'react';
import { Logo } from '../constants';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('ts_admin_authenticated', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Access Denied.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0015] p-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <Logo className="h-20 mb-6 bg-white p-2 rounded-xl" />
          <h2 className="text-white text-2xl font-black uppercase tracking-tighter">Admin Portal</h2>
          <p className="text-slate-400 text-sm mt-2">Enter your secure credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] uppercase font-black tracking-widest ml-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="admin"
            />
          </div>
          <div className="space-y-2">
            <label className="text-slate-400 text-[10px] uppercase font-black tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold py-3 px-4 rounded-xl text-center">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gradient-brand text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => window.location.hash = 'home'}
            className="text-slate-500 text-xs font-bold hover:text-white transition-colors"
          >
            ← Back to Public Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
