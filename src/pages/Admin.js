import { useState } from 'react';

export default function Admin() {
  const [videoURL, setVideoURL] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoURL || !title) {
      setMessage({ type: "error", text: "אנא מלא את כל השדות" });
      return;
    }
    // כאן תוסיף את הקוד להעלאה ל-Firebase Storage/Firestore
    setMessage({ type: "success", text: "סרטון הועלה בהצלחה (מדומה)" });
    setVideoURL("");
    setTitle("");
  };

  return (
    <main dir="rtl" className="max-w-lg mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">ניהול - העלאת סרטונים</h1>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 space-y-5">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">כותרת הסרטון</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="לדוגמה: הופעה חיה בתל אביב"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">קישור יוטיוב</label>
          <input
            type="url"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
        >
          העלה סרטון
        </button>
      </form>
    </main>
  );
}
