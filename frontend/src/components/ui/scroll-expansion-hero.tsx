'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Smooth Physics
  const progressSpring = useSpring(scrollProgress, { damping: 20, stiffness: 100 });
  
  // Use spring for visual calculations
  const visualProgress = progressSpring.get();

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && (globalThis.scrollY || 0) <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && (globalThis.scrollY || 0) <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1);
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => setTouchStartY(0);

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) globalThis.scrollTo(0, 0);
    };

    globalThis.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    globalThis.addEventListener('scroll', handleScroll as EventListener);
    globalThis.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    globalThis.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    globalThis.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      globalThis.removeEventListener('wheel', handleWheel as unknown as EventListener);
      globalThis.removeEventListener('scroll', handleScroll as EventListener);
      globalThis.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      globalThis.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      globalThis.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => setIsMobileState((globalThis.innerWidth || 0) < 768);
    checkIfMobile();
    globalThis.addEventListener('resize', checkIfMobile);
    return () => globalThis.removeEventListener('resize', checkIfMobile);
  }, []);

  const blurValue = (1 - scrollProgress) * 10; 

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className='transition-colors duration-700 ease-in-out overflow-x-hidden relative'>
      <section className='relative flex flex-col items-center justify-start min-h-dvh'>
        <div className='relative w-full flex flex-col items-center min-h-dvh'>
          
          {/* Background with Blur Effect */}
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1 - scrollProgress,
              filter: `blur(${blurValue}px)` 
            }}
            transition={{ duration: 0.1 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              fill
              className='w-screen h-screen object-cover'
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-dvh relative'>
              
              {/* Main Media Container with 3D Perspective (UPGRADE 8) */}
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)]'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  transform: `perspective(1200px) rotateY(${visualProgress * 8}deg) rotateX(${visualProgress * 3}deg) scale(${1 + visualProgress * 0.15})`,
                }}
                transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.3 }}
              >
                {mediaType === 'video' ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    {scrollProgress > 0.2 && (
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                      />
                    )}
                    
                    {/* Light Reflection Effect (UPGRADE 9) */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{ background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      fill
                      className='w-full h-full object-cover rounded-xl'
                    />
                    
                    {/* Light Reflection Effect (UPGRADE 9) */}
                    <motion.div
                      className="absolute inset-0 z-20 pointer-events-none"
                      style={{ background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}
              </motion.div>

              {/* Text Elements Container */}
              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p className='text-xl md:text-2xl text-gold-500 font-serif italic mb-2' style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p className='text-white/40 tracking-[0.3em] font-black uppercase text-[10px]' style={{ transform: `translateX(${textTranslateX}vw)` }}>
                      {scrollToExpand}
                    </p>
                  )}
                </div>

                <motion.h2
                  className='text-5xl md:text-7xl lg:text-9xl font-serif italic text-white transition-none tracking-tighter'
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-5xl md:text-7xl lg:text-9xl font-serif italic text-white transition-none tracking-tighter'
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            {/* Content Section */}
            <motion.section
              className='flex flex-col w-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
