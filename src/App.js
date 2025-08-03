import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminButton from "./components/AdminButton";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Admin from "./pages/Admin";
import { useState } from "react";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen text-gray-900 font-sans">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route
            path="/admin"
            element={isAdmin ? <Admin /> : <Navigate to="/" replace />}
          />
        </Routes>

        <AdminButton setIsAdmin={setIsAdmin} />
      </BrowserRouter>
    </div>
  );
}

export default App;
