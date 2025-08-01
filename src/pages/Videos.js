import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import VideoCard from '../components/VideoCard';

type Video = {
  id: string;
  title: string;
  youtubeUrl: string;
};

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const snapshot = await getDocs(collection(db, 'videos'));
      const videoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Video[];
      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {videos.map(video => (
        <VideoCard key={video.id} title={video.title} youtubeUrl={video.youtubeUrl} />
      ))}
    </div>
  );
}
