'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HeartCrack, LayoutDashboard, Settings, History, Star, ArrowUpRight, Home, Shield, Globe } from 'lucide-react';
import Image from 'next/image';

const mockFavorites = [
  {
    _id: '1',
    title: 'The Obsidian Villa',
    location: 'Kyoto, Japan',
    price: 12500000,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    _id: '2',
    title: 'Azure Heights',
    location: 'Santorini, Greece',
    price: 8900000,
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
  }
];

export default function DashboardPage() {
  const [favorites, setFavorites] = useState(mockFavorites);
  const user = { username: 'RANKIN', role: 'Premium Client' };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-20 font-sans relative overflow-hidden">
        {/* Cinematic Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.05),transparent_70%)] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 z-10 relative"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Welcome, {user.username}</h1>
            <p className="text-gray-500 tracking-widest uppercase text-xs font-bold font-serif italic">Identity Verified &bull; Active Portfolio</p>
          </div>
          
          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">Status</span>
              <div className="flex items-center gap-2 text-gold-500 font-serif italic">
                <Shield className="w-4 h-4" />
                <span className="text-xl">Premium Elite</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-12">
            <nav className="space-y-8">
              <Link href="#" className="flex items-center gap-4 text-gold-500 group">
                <LayoutDashboard className="w-5 h-5" />
                <span className="uppercase text-[10px] tracking-[0.3em] font-bold">Workspace</span>
              </Link>
              <Link href="#" className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                <History className="w-5 h-5" />
                <span className="uppercase text-[10px] tracking-[0.3em] font-bold">Timeline</span>
              </Link>
              <Link href="#" className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                <Star className="w-5 h-5" />
                <span className="uppercase text-[10px] tracking-[0.3em] font-bold">Curated</span>
              </Link>
              <Link href="#" className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors group">
                <Settings className="w-5 h-5" />
                <span className="uppercase text-[10px] tracking-[0.3em] font-bold">Encryption</span>
              </Link>
            </nav>

            <div className="pt-12 border-t border-white/5">
                <Link href="/" className="flex items-center gap-3 text-gray-600 hover:text-white transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="uppercase text-[9px] tracking-[0.3em] font-bold">Return to Base</span>
                </Link>
            </div>
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-9 space-y-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white tracking-widest uppercase text-xs font-bold font-serif italic">Saved Interests</h2>
              <span className="text-gold-500 font-serif italic text-xl border-b border-gold-500/20 pb-1">{favorites.length} Items</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <AnimatePresence mode="popLayout">
                {favorites.map((prop) => (
                    <motion.div 
                      key={prop._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="glass-card overflow-hidden flex flex-col group relative"
                    >
                      <div className="h-64 overflow-hidden relative">
                        <Image 
                          src={prop.imageUrl} 
                          alt={prop.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                        />
                        <button 
                          onClick={() => removeFavorite(prop._id)}
                          className="absolute top-4 right-4 bg-premium-900/40 backdrop-blur-md border border-white/10 p-3 text-white hover:text-red-500 transition-all hover:bg-white/10"
                        >
                          <HeartCrack className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-4 bg-gold-500 text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest leading-none">
                           ${prop.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="p-10 grow flex flex-col">
                        <h3 className="text-3xl font-serif text-white mb-4 italic tracking-tight">{prop.title}</h3>
                        <p className="text-gray-500 tracking-[0.2em] font-bold text-[10px] mb-8 uppercase leading-relaxed">&bull; {prop.location}</p>
                        <div className="mt-auto">
                          <Link 
                            href={`/properties/${prop._id}`} 
                            className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-gold-500 flex items-center justify-center gap-2 group/btn"
                          >
                            Enter Property <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                ))}
              </AnimatePresence>

              {favorites.length === 0 && (
                <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl">
                    <Globe className="w-12 h-12 text-gray-800 mb-6 animate-pulse" />
                    <p className="text-gray-600 uppercase text-[10px] tracking-[0.4em] font-bold">The portfolio is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
