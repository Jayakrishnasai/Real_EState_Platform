'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Loader2, AlertCircle, Shield, Globe, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    
    // Simulate API Authorization
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg z-10"
      >
        <div className="glass-card p-12 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-12">
             <Link href="/" className="mb-8 hover:scale-110 transition-transform">
               <div className="w-16 h-16 bg-gold-500 flex items-center justify-center rounded-sm">
                 <Lock className="w-8 h-8 text-black" />
               </div>
             </Link>
             <div className="flex gap-6 mb-8 text-gray-500">
               <Globe className="w-5 h-5 hover:text-gold-500 cursor-pointer transition-colors" />
               <Shield className="w-5 h-5 hover:text-gold-500 cursor-pointer transition-colors" />
             </div>
             <h2 className="text-4xl font-serif text-white text-center mb-4 tracking-tight italic">Initialize Access</h2>
             <p className="text-gray-500 text-center uppercase tracking-[0.2em] text-[10px] font-bold">Secure Entry Protocol</p>
          </div>

          <AnimatePresence>
            {err && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, x: [0, -10, 10, -6, 6, 0] }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 mb-8 text-xs font-bold tracking-widest flex items-center gap-3"
              >
                <AlertCircle className="w-4 h-4" /> {err}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label htmlFor="login-email" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Encrypted Identity</label>
              <input 
                id="login-email"
                type="email" 
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-gold-500 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:scale-[1.02] transition-all duration-300 font-light text-lg"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="login-password" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Access Matrix</label>
              <input 
                id="login-password"
                type="password" 
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-gold-500 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:scale-[1.02] transition-all duration-300 font-light text-lg"
              />
            </div>

            <motion.button 
              type="submit" 
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] text-black py-6 font-bold uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" 
                animate={{ x: ["-200%", "200%"] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Entry"}
              </span>
            </motion.button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <p className="text-center text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
              New Provision? <Link href="/register" className="text-gold-500 hover:text-gold-400 ml-2 border-b border-gold-500/20 pb-1">Request Access</Link>
            </p>
            <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 uppercase text-[9px] tracking-[0.4em] font-bold">
              <Home className="w-3 h-3" /> Return to Command Center
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
