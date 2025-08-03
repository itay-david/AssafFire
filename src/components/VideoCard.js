import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VideoCard({ video, index, isHovered, onHover, onLeave }) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // בדיקה אם זה מכשיר מובייל
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="group relative cursor-pointer"
    >
      <motion.div
        className="relative bg-slate-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-700/30"
        whileHover={{ 
          scale: 1.03,
          rotateY: 2,
          rotateX: 2,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ 
          transformStyle: 'preserve-3d',
          boxShadow: isHovered ? '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* זוהר דינמי - רק במחשב */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.15), transparent 50%)`,
            }}
          />
        )}

        {/* תמונת וידאו - ניתן ללחיצה */}
        <div className="relative aspect-video overflow-hidden">
          <iframe
            className="w-full h-full object-cover pointer-events-auto"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* תוכן הכרטיס */}
        <div className="p-6">
          <motion.h3
            className="text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300"
            layoutId={`title-${index}`}
          >
            {video.title}
          </motion.h3>
          
          <motion.p
            className="text-slate-400 text-sm leading-relaxed mb-4"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {video.description}
          </motion.p>

          {/* שורה תחתונה
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/40">
            <span className="text-xs text-slate-500 font-medium">לחץ לצפייה מלאה</span>
            
            <motion.div
              className="flex items-center space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9m0 0H7.5A2.5 2.5 0 015 12.5V10" />
                </svg>
              </motion.div>
            </motion.div>
          </div> */}
        </div>
      </motion.div>
    </motion.div>
  );
}