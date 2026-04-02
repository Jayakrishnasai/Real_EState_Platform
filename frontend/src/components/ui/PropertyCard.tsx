'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BedDouble, Bath, Maximize, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  imageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PropertyCard = ({ property }: { property: Property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(212,175,55,0.15)" }}
      className="bg-premium-800 border border-white/5 overflow-hidden group relative flex flex-col h-full shadow-2xl hover:shadow-gold-500/10 transition-all duration-500"
    >
      {/* 3D Tilt Wrapper Simulation */}
      <motion.div
        whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }}
        transition={{ type: "spring", damping: 15, stiffness: 150 }}
        className="relative h-80 overflow-hidden"
      >
        <Image
          src={property.imageUrl || '/villa.png'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-premium-900 via-transparent to-transparent opacity-60" />
        
        {/* Price Tag with Glassmorphism */}
        <div className="absolute top-6 right-6 bg-premium-900/40 backdrop-blur-xl border border-white/20 px-6 py-2 text-gold-400 font-serif font-bold text-xl shadow-xl">
          ${property.price.toLocaleString()}
        </div>

        {/* Favorite Heart Animation */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
          className="absolute top-6 left-6 p-3 rounded-full bg-premium-900/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group/heart"
        >
          <motion.div
            animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Heart className={`w-6 h-6 transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </motion.div>
        </button>

        <div className="absolute bottom-6 left-6 bg-gold-500 text-premium-900 px-4 py-1 text-xs font-bold uppercase tracking-widest">
          {property.type}
        </div>
      </motion.div>

      <div className="p-10 flex flex-col flex-1">
        <div className="flex items-center text-gray-400 text-sm mb-4 tracking-widest uppercase font-medium">
          <MapPin className="w-4 h-4 mr-2 text-gold-500" /> {property.location}
        </div>
        <h3 className="text-3xl font-serif text-white mb-8 group-hover:text-gold-500 transition-colors line-clamp-1 italic">
          {property.title}
        </h3>
        
        {/* Features Row */}
        <div className="flex justify-between text-gray-400 text-sm py-6 border-y border-white/5 mb-10">
          <div className="flex flex-col items-center gap-2">
            <BedDouble className="w-6 h-6 text-gold-500/60" />
            <span className="font-medium tracking-tighter uppercase text-[10px]">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex flex-col items-center gap-2">
            <Bath className="w-6 h-6 text-gold-500/60" />
            <span className="font-medium tracking-tighter uppercase text-[10px]">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="w-px bg-white/5" />
          <div className="flex flex-col items-center gap-2">
            <Maximize className="w-6 h-6 text-gold-500/60" />
            <span className="font-medium tracking-tighter uppercase text-[10px]">{property.area} Sq Ft</span>
          </div>
        </div>

        <Link 
          href={`/properties/${property._id}`} 
          className="mt-auto block w-full text-center bg-transparent border border-gold-500/50 text-gold-500 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-gold-500 hover:text-black hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500 active:scale-95"
        >
          View Residence
        </Link>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
