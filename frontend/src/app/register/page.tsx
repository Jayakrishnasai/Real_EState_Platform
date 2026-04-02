'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Loader2, AlertCircle, Globe, Shield, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Buyer',
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    
    // Simulate API Provisioning
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 lg:p-12 font-sans relative overflow-hidden">
      {/* Cinematic Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(255,215,0,0.05),transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl z-10"
      >
        <div className="glass-card p-12 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-12">
             <Link href="/" className="mb-8 hover:scale-110 transition-transform">
               <div className="w-16 h-16 bg-gold-500 flex items-center justify-center rounded-sm">
                 <Home className="w-8 h-8 text-black" />
               </div>
             </Link>
             <div className="flex gap-6 mb-8 text-gray-500">
              <Globe className="w-5 h-5 hover:text-gold-500 cursor-pointer transition-colors" />
              <Shield className="w-5 h-5 hover:text-gold-500 cursor-pointer transition-colors" />
              <Star className="w-5 h-5 hover:text-gold-500 cursor-pointer transition-colors" />
            </div>
             <h2 className="text-4xl font-serif text-white text-center mb-4 tracking-tight italic">Request Access</h2>
             <p className="text-gray-500 leading-relaxed mb-8 max-w-xs uppercase text-[10px] tracking-widest font-bold">
Initialize Member Provisioning</p>
          </div>

          <AnimatePresence>
            {err && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 mb-8 text-xs font-bold tracking-widest flex items-center gap-3"
              >
                <AlertCircle className="w-4 h-4" /> {err}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label htmlFor="reg-name" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Full Identity</label>
                <input 
                  id="reg-name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-gold-500/50 transition-all font-light text-lg"
                  placeholder="EX RANKIN"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="reg-role" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Client Protocol</label>
                <select 
                  id="reg-role"
                  value={formData.role}
                  onChange={(e)=>setFormData({...formData, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-gold-500/50 transition-all font-light text-lg h-[62px] appearance-none cursor-pointer"
                >
                  <option value="Buyer">BUYER</option>
                  <option value="Seller">SELLER</option>
                  <option value="Agent">AGENT</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="reg-email" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Encrypted Communication</label>
              <input 
                id="reg-email"
                type="email" 
                required
                value={formData.email}
                onChange={(e)=>setFormData({...formData, email: e.target.value})}
                autoComplete="email"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-gold-500/50 transition-all font-light text-lg"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="reg-password" className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Secure Access Key</label>
              <input 
                id="reg-password"
                type="password" 
                required
                value={formData.password}
                onChange={(e)=>setFormData({...formData, password: e.target.value})}
                autoComplete="new-password"
                className="w-full bg-white/5 border border-white/10 px-6 py-5 text-white focus:outline-none focus:border-gold-500/50 transition-all font-light text-lg"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-black py-6 font-bold uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-3000" />
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Authorization"}
            </button>
          </form>

          <p className="mt-12 text-center text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">
            Already verified? <Link href="/login" className="text-gold-500 hover:text-gold-400 ml-2 border-b border-gold-500/20 pb-1">Enter Matrix</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
