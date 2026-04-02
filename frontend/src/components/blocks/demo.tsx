'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContentItem {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContentItem;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
    background:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop', // Luxury House
    title: 'Experience Architectural Excellence',
    date: 'Est. 2026',
    scrollToExpand: 'Scroll to Discover',
    about: {
      overview:
        'Welcome to SSP Estates, where we redefine luxury living. Our immersive platform allows you to explore the world\'s most exclusive properties with cinematic precision. As you scroll, witness the seamless expansion of our high-definition residence tours.',
      conclusion:
        'Every detail is meticulously crafted to showcase the pinnacle of modern design. From infinity pools to panoramic vistas, discover your next masterpiece with us.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1280&auto=format&fit=crop', // Modern Villa
    background:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop', // Background Estate
    title: 'Curated Premium Collection',
    date: 'Exclusive Listings',
    scrollToExpand: 'Scroll to Explore',
    about: {
      overview:
        'Our image showcase highlights the intricate textures and expansive volumes of our premium portfolio. The same cinematic expansion effect provides a focused look at Every architectural accomplishment.',
      conclusion:
        'Whether it\'s a coastal villa or a metropolitan penthouse, our curated collection ensures you find the perfect sanctuary.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className='max-w-5xl mx-auto py-28 px-8'
    >
      <h2 className='text-4xl md:text-6xl font-serif font-bold mb-12 text-white tracking-tight'>
        About SSP Estates
      </h2>
      <p className='text-lg md:text-xl mb-12 text-gray-400 font-light leading-relaxed'>
        {currentMedia.about.overview}
      </p>

      <p className='text-lg md:text-xl mb-12 text-gray-400 font-light leading-relaxed'>
        {currentMedia.about.conclusion}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div className="p-8 rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl hover:scale-[1.03] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <h3 className="font-serif text-gold-400 mb-4 tracking-widest uppercase text-xs font-bold leading-none">Unrivaled Quality</h3>
          <p className="text-gray-400 leading-relaxed">Hand-picked properties that meet the highest standards of luxury and design.</p>
        </div>
        <div className="p-8 rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl hover:scale-[1.03] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <h3 className="font-serif text-gold-400 mb-4 tracking-widest uppercase text-xs font-bold leading-none">Expert Curation</h3>
          <p className="text-gray-400 leading-relaxed">Personalized advisory services to help you secure the world's most desired addresses.</p>
        </div>
      </div>
    </motion.div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('image');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mediaType]);

  return (
    <div className='min-h-screen bg-linear-to-b from-black via-neutral-950 to-black overflow-x-hidden relative'>
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(255,215,0,0.08),transparent_60%)] pointer-events-none" />

      {/* Media section toggle buttons removed */}

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
