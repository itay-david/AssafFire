import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950/60 to-black overflow-hidden">
      {/* רקע אינטראקטיבי - רק במחשב */}
      {!isMobile && (
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(139, 69, 19, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)',
              left: mousePosition.x - 350,
              top: mousePosition.y - 350,
            }}
            transition={{ type: "spring", damping: 30 }}
          />
        </div>
      )}

      {/* אלמנטים דקורטיביים */}
      <div className="absolute inset-0">
        
        {/* שכבת רקע מתנועע */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:80px_80px]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        {/* כותרת ראשית */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-black mb-8 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent"
            style={{ filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.3))' }}
          >
            קצת עלי
          </motion.h1>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* תוכן ראשי */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* צד שמאל - תמונה */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <div className="w-full aspect-square bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-3xl backdrop-blur-sm border border-slate-700/30 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🎹</div>
                  <p className="text-slate-400 text-lg">תמונה תגיע בקרוב...</p>
                </div>
              </div>
              
              {/* אפקט זוהר סביב התמונה */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl -z-10 opacity-60"></div>
            </div>
          </motion.div>

          {/* צד ימין - טקסט */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              className="space-y-6 text-lg leading-relaxed text-slate-300"
            >
              <p className="text-2xl font-light text-white/90 leading-relaxed">
                שלום, אני אסף פייר - פסנתרן, יוצר ומוזיקאי מהלב
              </p>
              
              <p>
                המוזיקה היא השפה שלי לעולם. דרכה אני מבטא רגשות, מספר סיפורים ויוצר קשרים עמוקים עם האנשים שמקשיבים ליצירות שלי.
              </p>
              
              <p>
                התחלתי לנגן בגיל צעיר, ומאז המוזיקה הפכה לחלק בלתי נפרד מהחיים שלי. אני מתמחה בז'אנרים שונים - מקלאסי ועד מודרני, מבלדות רגשיות ועד יצירות אנרגטיות.
              </p>
              
              <p className="text-amber-300/80 font-medium">
                כל יצירה שאני יוצר נולדת מרגש אמיתי ומחוויה אישית שעברתי.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* סטטיסטיקות */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: "15+", label: "שנות ניסיון" },
            { number: "100+", label: "יצירות מקוריות" },
            { number: "50+", label: "הופעות חיות" },
            { number: "10K+", label: "מעריצים" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-slate-700/30"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(245, 158, 11, 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* המסר האישי */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center px-4 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-md rounded-3xl p-10 md:p-12 border border-slate-700/30 overflow-hidden">
            <motion.blockquote 
              className="text-2xl md:text-3xl font-light text-white/90 leading-relaxed mb-8 italic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              "המוזיקה היא הדרך שלי להגיד מילים שלא יכולתי למצוא בשפה הרגילה. היא מחברת אותי לנשמות אחרות ויוצרת רגעים של קסם טהור."
            </motion.blockquote>

            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              style={{ transformOrigin: 'left' }}
            />

            <div className="text-amber-300 text-xl font-medium">עם אהבה וכבוד, אסף פייר</div>
          </div>
        </motion.div>

        {/* קישורים חברתיים */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center space-x-6 rtl:space-x-reverse mt-16"
        >
          {[
            { icon: "🎵", label: "Spotify" },
            { icon: "📱", label: "Instagram" },
            { icon: "📧", label: "Contact" }
          ].map((social, index) => (
            <motion.button
              key={index}
              className="w-16 h-16 bg-slate-800/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-slate-700/40 hover:border-amber-400/60 transition-all duration-300"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{social.icon}</span>
            </motion.button>
          ))}
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