import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home({ setCurrentPage }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-black overflow-hidden">
      {/* רקע אינטראקטיבי */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 193, 7, 0.3) 0%, rgba(255, 87, 34, 0.2) 40%, transparent 70%)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
          transition={{ type: "spring", damping: 30 }}
        />
        
        {/* שכבת רקע מתנועע */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <motion.div
          style={{ y: y1, opacity, scale }}
          className="max-w-5xl"
        >
          {/* כותרת מרכזית */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1 
              className="text-8xl md:text-9xl font-black mb-6 leading-none"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #92400e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.3))',
              }}
            >
              יצירה
            </motion.h1>
            <motion.h2
              className="text-6xl md:text-7xl font-light text-white/90 tracking-wider"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              מהנשמה
            </motion.h2>
          </motion.div>

          {/* תיאור */}
          <motion.p 
            className="text-xl md:text-2xl text-slate-300/80 mb-16 leading-relaxed max-w-4xl mx-auto font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            המוזיקה שלי היא מסע רגשי שמתחיל מהלב ומגיע ישר אל הנשמה. כאן תמצאו יצירות מקוריות, הופעות חיות ורגעים של השראה טהורה
          </motion.p>

          {/* כפתורים */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setCurrentPage('videos')}
              className="group relative px-12 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-bold text-lg rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">לצפייה בסרטונים</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => setCurrentPage('about')}
              className="px-12 py-4 text-white font-medium text-lg rounded-full border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 hover:border-amber-400/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              קצת עלי
            </motion.button>
          </motion.div>
        </motion.div>
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