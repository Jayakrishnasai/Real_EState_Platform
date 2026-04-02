'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Dynamic import for Leaflet to avoid SSR issues
const PropertyMap = dynamic(() => import('@/components/ui/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-premium-800 animate-pulse rounded-2xl" />
});

const mockProperty = {
  _id: '1',
  title: 'The Obsidian Villa',
  location: 'Kyoto, Japan',
  price: 12500000,
  imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop',
  bedrooms: 6,
  bathrooms: 8,
  area: 8500,
  type: 'Residential',
  description: 'A masterpiece of contemporary architecture situated in the heart of Kyoto. This obsidian-inspired villa features seamless indoor-outdoor living, a private zen garden, and panoramic views of the historical districts.',
  amenities: ['Private Spa', 'Infinity Pool', 'Wine Cellar', 'Smart Home System', 'Helipad Access', '24/7 Concierge'],
  coordinates: [35.0116, 135.7681] as [number, number],
};

export default function PropertyDetailPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();
  const property = mockProperty; // In real app, fetch based on params.id

  const images = [property.imageUrl, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Hero Gallery Section */}
      <section className="relative h-[85vh] group overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage]}
              alt={`${property.title} view ${currentImage + 1}`}
              fill
              className="object-cover transition-transform duration-3000 group-hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-between px-10 z-30 pointer-events-none">
          <button onClick={prevImage} className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-gold-500 hover:text-black transition-all group active:scale-95">
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button onClick={nextImage} className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full border border-white/20 hover:bg-gold-500 hover:text-black transition-all group active:scale-95">
             <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-premium-900/40 via-transparent to-black z-10" />

        {/* Navigation Overlays */}
        <div className="absolute top-10 left-10 z-20">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-black/20 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-sm hover:bg-gold-500 hover:text-black transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="uppercase text-[10px] tracking-[0.3em] font-bold">Return to Discovery</span>
          </button>
        </div>

        <div className="absolute bottom-20 left-10 z-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 text-gold-500 mb-6">
              <ShieldCheck className="w-5 h-5" />
              <span className="uppercase text-[10px] tracking-[0.4em] font-bold">Verified Luxury Listing</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter mb-8">{property.title}</h1>
            <div className="flex items-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold-500" />
                <span className="uppercase text-[10px] tracking-[0.2em] font-bold">{property.location}</span>
              </div>
              <div className="h-4 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-500" />
                <span className="uppercase text-[10px] tracking-[0.2em] font-bold italic">Available 2026</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-10 z-20 flex gap-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-5 rounded-full border transition-all ${isFavorite ? 'bg-gold-500 border-gold-500 text-black' : 'bg-black/20 backdrop-blur-xl border-white/20 text-white hover:bg-white/10'}`}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-black' : ''}`} />
          </button>
          <button title="Share" className="p-5 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 transition-all">
            <Share2 className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="container mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
        <div className="lg:col-span-7 space-y-16">
          <div className="space-y-8">
            <h2 className="text-white tracking-[0.3em] uppercase text-xs font-bold font-serif italic">The Residence Story</h2>
            <p className="text-2xl md:text-4xl font-serif text-gray-300 leading-tight italic">
              "{property.description}"
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 py-12 border-y border-white/5">
            <div className="space-y-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Sleeping Quarters</span>
              <div className="flex items-center gap-3 text-gold-500">
                <BedDouble className="w-5 h-5" />
                <span className="text-3xl font-serif">{property.bedrooms} Units</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Bathing Rooms</span>
              <div className="flex items-center gap-3 text-gold-500">
                <Bath className="w-5 h-5" />
                <span className="text-3xl font-serif">{property.bathrooms} Units</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Living Volume</span>
              <div className="flex items-center gap-3 text-gold-500">
                <Maximize className="w-5 h-5" />
                <span className="text-3xl font-serif">{property.area.toLocaleString()} SqFt</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-white tracking-[0.3em] uppercase text-xs font-bold font-serif italic">Elite Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3 group cursor-default">
                  <CheckCircle2 className="w-4 h-4 text-gold-500/50 group-hover:text-gold-500 transition-colors" />
                  <span className="text-gray-400 text-sm uppercase tracking-widest font-bold group-hover:text-white transition-colors">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <aside className="lg:col-span-5 sticky top-32">
          <div className="glass-card p-12 border border-white/10 space-y-12">
            <div>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-4 block">Acquisition Value</span>
              <div className="text-6xl font-serif italic text-gold-500">${property.price.toLocaleString()}</div>
            </div>

            <div className="space-y-6">
              <button className="w-full bg-white text-black py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-gold-500 transition-all active:scale-[0.98]">
                Initialize Inquiry
              </button>
              <button className="w-full bg-transparent border border-white/10 text-white py-6 font-black uppercase tracking-[0.4em] text-xs hover:bg-white/10 transition-all">
                Download Dossier
              </button>
            </div>

            <div className="pt-12 border-t border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-premium-800 rounded-full overflow-hidden relative">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Advisor" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-serif italic text-lg">EX RANKIN</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Principal Advisor</p>
                </div>
              </div>
              <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold leading-relaxed">
                SSP INTERNATIONAL REALTY PARTNERS. EXCLUSIVE LISTING AGENT.
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Map Section */}
      <section className="h-[600px] w-full border-t border-white/5 relative bg-premium-900">
        <PropertyMap center={property.coordinates} title={property.title} />
        <div className="absolute top-10 right-10 z-20 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-2">Location Coordinates</span>
            <p className="text-white font-serif italic text-xl tracking-widest">{property.location}</p>
            <div className="flex items-center gap-2 text-gold-500 mt-4">
              <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-bold">Global Network Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
