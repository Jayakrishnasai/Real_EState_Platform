'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Auth for migration (will be replaced by full Context)
const useAuth = () => ({ user: null, logout: () => {} });

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentBg = pathname === '/' && !isScrolled;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        transparentBg 
          ? 'bg-transparent text-white' 
          : 'bg-premium-900/95 backdrop-blur-md text-white shadow-lg border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Home className="text-gold-500 w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="font-serif text-2xl font-bold tracking-widest">SSP ESTATES</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10 font-sans text-sm font-medium tracking-widest uppercase">
            <Link href="/properties" className="hover:text-gold-500 transition-colors">Properties</Link>
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-gold-500 transition-colors">Dashboard</Link>
                <button onClick={logout} className="hover:text-gold-500 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gold-500 transition-colors">Login</Link>
                <Link href="/register" className="px-8 py-3 bg-gold-500 text-premium-900 font-bold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 active:scale-95">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold-500 p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-premium-900 border-t border-premium-700 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              <Link href="/properties" className="block text-lg text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Properties</Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block text-lg text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left text-lg text-white hover:text-gold-500">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block text-lg text-white hover:text-gold-500" onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/register" className="block text-lg font-bold text-gold-500" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
