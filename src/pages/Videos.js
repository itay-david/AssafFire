import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VideoCard from '../components/VideoCard';

const videos = [
    { title: "יצירה מקורית", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "קטע חדש ומרגש שנוצר השבוע", duration: "4:32" },
    { title: "הופעה חיה", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "מהופעה באולם התרבות תל אביב", duration: "12:45" },
    { title: "קטע מרגש", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "רגעים של השראה ויצירתיות", duration: "6:18" },
    { title: "אלתור חופשי", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "יצירתיות ספונטנית על הבמה", duration: "8:22" },
    { title: "יצירה קלאסית", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "פרשנות מודרנית ליצירה קלאסית", duration: "15:30" },
    { title: "סט מלא", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "חוויה מוזיקלית שלמה ומרגשת", duration: "45:12" },
  ];

export default function Videos() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  useEffect(() => {
    if (isMobile) return; // לא לעקוב בטלפון
    
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-950/30 px-6">
      {/* רקע דינמי - רק במחשב */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(251, 191, 36, 0.2) 40%, transparent 70%)',
              left: mousePosition.x - 300,
              top: mousePosition.y - 300,
            }}
            transition={{ type: "spring", damping: 25 }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto pt-20">
        {/* כותרת */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.3))' }}
          >
            הסרטונים
          </motion.h1>
          <motion.p
            className="text-xl text-slate-300/70 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            אוסף נבחר של יצירות, הופעות וביטויים מוזיקליים שנוצרו בהשראה ובאהבה לאמנות
          </motion.p>
        </motion.div>

        {/* רשת סרטונים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              video={video}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
      <footer className="mt-auto text-center text-white/70 text-sm pb-6">
        <div className="flex justify-center items-center gap-1">
          <span>האתר נבנה ב</span>
          <span className="text-red-500 text-base">❤️</span>
          <span>על ידי איתי דוד</span>
        </div>
      </footer>
    </div>
  );
}