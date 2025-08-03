import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ currentPage, setCurrentPage, navbarColors }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    background = "from-purple-950 via-slate-900 to-amber-900",
    glow = "from-amber-400/10 via-orange-400/10 to-purple-600/10",
    border = "border-white/10"
  } = navbarColors || {};

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-700 bg-gradient-to-r ${background} backdrop-blur-xl shadow-md ${border}`}
        dir="rtl"
      >
        {/* רקע זוהר עדין */}
        <motion.div
          className={`absolute inset-0 z-[-1] bg-gradient-to-r ${glow} blur-xl opacity-50`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* לוגו */}
          <motion.div 
            className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('home')}
          >
            אסף פייר
          </motion.div>

          {/* תפריט דסקטופ */}
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {[
              { name: 'בית', page: 'home' },
              { name: 'סרטונים', page: 'videos' },
              { name: 'קצת עלי', page: 'about' }
            ].map((item) => (
              <motion.button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`relative px-4 py-2 font-medium transition-colors duration-300 ${
                  currentPage === item.page
                    ? 'text-amber-400'
                    : 'text-white hover:text-amber-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {currentPage === item.page && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                    layoutId="navbar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* המבורגר */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-amber-400/10 via-white/10 to-purple-600/10 border border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* תפריט מובייל */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden bg-gradient-to-b ${background} backdrop-blur-lg border-t ${border}`}
            >
              <div className="px-6 py-4 space-y-4">
                {[
                  { name: 'בית', page: 'home' },
                  { name: 'סרטונים', page: 'videos' },
                  { name: 'קצת עלי', page: 'about' }
                ].map((item) => (
                  <motion.button
                    key={item.page}
                    onClick={() => {
                      setCurrentPage(item.page);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-right py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === item.page
                        ? 'text-amber-400 border border-amber-500/30 bg-white/5'
                        : 'text-white hover:bg-white/10 hover:text-amber-300'
                    }`}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ביטול רווח מיותר מתחת ל־Navbar */}
      <div className="h-0"></div>
    </>
  );
}
