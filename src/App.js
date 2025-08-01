import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div dir="rtl" className="font-sans bg-gray-50 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
