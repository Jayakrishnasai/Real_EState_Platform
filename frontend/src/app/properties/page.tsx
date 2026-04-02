'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Filter, X } from 'lucide-react';
import PropertyCard from '@/components/ui/PropertyCard';

// Mock Data for fallback
const mockProperties = [
  { _id: '1', title: 'The Glass Pavilion', price: 12500000, location: 'Beverly Hills, CA', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', bedrooms: 6, bathrooms: 8, area: 12000, type: 'Villa' },
  { _id: '2', title: 'Tropical Oasis Villa', price: 8900000, location: 'Miami, FL', imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', bedrooms: 5, bathrooms: 6, area: 8500, type: 'Villa' },
  { _id: '3', title: 'Skyline Penthouse', price: 5400000, location: 'Manhattan, NY', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', bedrooms: 3, bathrooms: 4, area: 4200, type: 'Penthouse' },
  { _id: '4', title: 'Tirumala Foothills Estate', price: 15500000, location: 'Tirupati, India', imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde', bedrooms: 6, bathrooms: 6, area: 9500, type: 'Villa' },
  { _id: '5', title: 'Spiritual Grandeur Villa', price: 21000000, location: 'Tirupati, India', imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bed65ec', bedrooms: 8, bathrooms: 10, area: 15000, type: 'Villa' }
];

export default function PropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ location: '', maxPrice: '', type: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Advanced Debounced Filter Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);
      // Simulate API or filter mock data
      const filtered = mockProperties.filter(p => {
        const locMatch = !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase());
        const priceMatch = !filters.maxPrice || p.price <= Number(filters.maxPrice);
        const typeMatch = !filters.type || p.type === filters.type;
        return locMatch && priceMatch && typeMatch;
      });
      setProperties(filtered);
      setLoading(false);
    }, 400); // 400ms Debounce

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const clearFilters = () => setFilters({ location: '', maxPrice: '', type: '' });

  return (
    <div className="pt-32 pb-24 bg-premium-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 italic tracking-tight">The Portfolio</h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Meticulously curated collection of the world's finest architectural accomplishments. Explore residences that redefine the art of living.
            </p>
          </motion.div>

          {/* Toggle Filters Mobile */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-4 bg-white/5 border border-white/10 px-8 py-4 text-gold-500 uppercase tracking-widest font-bold active:scale-95 transition-all"
          >
            <Filter className="w-5 h-5" /> {showFilters ? 'Close Selection' : 'Refine Selection'}
          </button>
        </div>

        {/* Real-time Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 bg-white/5 backdrop-blur-2xl p-8 border border-white/10 shadow-2xl relative z-40 ${showFilters ? 'block' : 'hidden md:grid'}`}
            >
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform" />
                <input 
                  type="text" 
                  placeholder="LOCATION"
                  className="w-full bg-premium-900/50 border border-white/10 text-white pl-16 pr-6 py-5 focus:border-gold-500 outline-none transition-all placeholder:text-gray-600 tracking-widest text-xs font-bold"
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>

              <div className="relative group">
                <select 
                  className="w-full bg-premium-900/50 border border-white/10 text-white px-8 py-5 focus:border-gold-500 outline-none transition-all appearance-none tracking-widest text-xs font-bold cursor-pointer"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                >
                  <option value="">ANY PRICE</option>
                  <option value="1000000">UP TO $1M</option>
                  <option value="5000000">UP TO $5M</option>
                  <option value="10000000">UP TO $10M</option>
                  <option value="50000000">UP TO $50M</option>
                </select>
              </div>

              <div className="relative group">
                <select 
                  className="w-full bg-premium-900/50 border border-white/10 text-white px-8 py-5 focus:border-gold-500 outline-none transition-all appearance-none tracking-widest text-xs font-bold cursor-pointer"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">ALL TYPES</option>
                  <option value="Villa">VILLA</option>
                  <option value="Penthouse">PENTHOUSE</option>
                  <option value="Apartment">APARTMENT</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="flex-1 bg-white/5 border border-white/10 text-white py-5 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> CLEAR
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Loading State */}
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            />
            <p className="text-gold-500 font-serif italic text-2xl tracking-widest animate-pulse">Curating Selection...</p>
          </div>
        ) : (
          <motion.div 
            layout
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode='popLayout'>
              {properties.length > 0 ? (
                properties.map((prop) => (
                  <PropertyCard key={prop._id} property={prop} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full h-[50vh] flex flex-col items-center justify-center text-center p-20 glass-card"
                >
                  <Search className="w-20 h-20 text-white/5 mb-10" />
                  <h2 className="text-4xl font-serif text-white mb-6">No Matches Found</h2>
                  <p className="text-gray-500 max-w-lg mb-10 text-lg font-light leading-relaxed">
                    "The perfect home is out there, but our current curated set does not match these specific criteria."
                  </p>
                  <button 
                    onClick={clearFilters}
                    className="text-gold-500 border-b border-gold-500/50 pb-2 hover:text-gold-400 transition-all font-bold tracking-widest uppercase text-xs"
                  >
                    Reset Archive
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
