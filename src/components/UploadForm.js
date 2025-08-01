import { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'videos'), {
      title,
      youtubeUrl,
      createdAt: Timestamp.now(),
    });
    setTitle('');
    setYoutubeUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white shadow rounded max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold text-right">העלאת סרטון חדש</h2>
      <input
        type="text"
        placeholder="כותרת הסרטון"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded text-right"
      />
      <input
        type="text"
        placeholder="קישור ליוטיוב"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        className="w-full p-2 border rounded text-right"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        העלה
      </button>
    </form>
  );
}
