import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative bg-dark text-fadedWhite font-hebrew overflow-hidden">
      {/* רקע תמונה אומנותית */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('/piano-bg.jpg')` }}></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-softGold mb-4 leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          יצירה מהנשמה  
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
        >
          המוזיקה של [השם שלך] היא שילוב של עומק, רגש ודיוק. כאן תמצאו קטעים חיים, יצירות מקוריות ותוכן נדיר.
        </motion.p>

        <motion.div
          className="h-[1px] w-24 bg-softGold my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        />

        <motion.a
          href="/videos"
          className="mt-4 inline-block px-10 py-3 text-lg rounded border border-softGold text-softGold hover:bg-softGold hover:text-black transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          לצפייה בסרטונים
        </motion.a>
      </div>
    </div>
  );
}
