// components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-30 top-0 rtl" dir="rtl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900 select-none cursor-default">
            פסנתרן 🖤
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 rtl:space-x-reverse font-medium text-gray-700">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              בית
            </Link>
            <Link
              to="/videos"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              סרטונים
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 font-medium text-gray-700">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-blue-600 transition-colors duration-300"
            >
              בית
            </Link>
            <Link
              to="/videos"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-blue-600 transition-colors duration-300"
            >
              סרטונים
            </Link>
          </div>
        )}
      </nav>
      {/* רווח שיאפשר שהנב בר לא יכסה את התוכן */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}
