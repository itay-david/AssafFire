import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import About from './pages/About';
import { navbarThemes } from './theme/navbarThemes';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Home setCurrentPage={setCurrentPage} />
          </motion.div>
        );
      case 'videos':
        return (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Videos setCurrentPage={setCurrentPage} />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <About setCurrentPage={setCurrentPage} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans antialiased bg-black text-white" dir="rtl">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        navbarColors={navbarThemes[currentPage]}
      />

      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </div>

  );


}