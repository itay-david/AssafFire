// components/AdminButton.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminButton({ setIsAdmin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "123") {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword("");
      setError("");
      navigate("/admin");
    } else {
      setError("סיסמה שגויה");
    }
  };

  return (
    <div className="fixed bottom-5 left-5 rtl:left-auto rtl:right-5 z-50">
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition"
        title="כניסת מנהל"
      >
        🔒 מנהל
      </button>

      {showLogin && (
        <form
          onSubmit={handleSubmit}
          className="mt-2 bg-white p-4 rounded-md shadow-lg w-60"
        >
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && (
            <p className="text-red-600 text-sm mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition"
          >
            התחבר
          </button>
        </form>
      )}
    </div>
  );
}
