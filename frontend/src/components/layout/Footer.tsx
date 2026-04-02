'use client';

import React from 'react';
import { Home, Globe, Mail, Shield, Star } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-24">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-gold-500 flex items-center justify-center rounded-sm group-hover:rotate-12 transition-transform duration-500">
                <Home className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-serif tracking-[0.2em] text-white italic">NEXARATS</span>
            </Link>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-xs uppercase text-[10px] tracking-widest font-bold">
              Redefining luxury real estate experiences with cinematic property tours and a curated portfolio of the world's most desired addresses.
            </p>
            <div className="flex gap-6">
              <Link href="#" aria-label="Globe" className="hover:text-gold-500 transition-colors"><Globe className="w-6 h-6" /></Link>
              <Link href="#" aria-label="Shield" className="hover:text-gold-500 transition-colors"><Shield className="w-6 h-6" /></Link>
              <Link href="#" aria-label="Star" className="hover:text-gold-500 transition-colors"><Star className="w-6 h-6" /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8 italic">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/properties" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Portfolios</Link></li>
              <li><Link href="/dashboard" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Private Access</Link></li>
              <li><Link href="/login" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Initialize</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8 italic">Protocols</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Privacy Matrix</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Legal Framework</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-gold-500 transition-colors uppercase text-[10px] tracking-[0.3em] font-bold">Client Charter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-serif text-lg mb-8 italic">Communication</h4>
            <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em] font-bold mb-4">Secure Channel</p>
            <div className="flex items-center gap-4 group cursor-pointer hover:text-gold-500 transition-colors">
              <Mail className="w-5 h-5 text-gold-500" />
              <span className="text-gray-300 font-light">protocols@nexarats.inv</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 uppercase text-[9px] tracking-[0.4em] font-bold">
            &copy; {new Date().getFullYear()} NEXARATS INTERNATIONAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <span className="text-gray-600 uppercase text-[9px] tracking-[0.4em] font-bold">LUXURY CERTIFIED</span>
            <span className="text-gray-600 uppercase text-[9px] tracking-[0.4em] font-bold">EST. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
