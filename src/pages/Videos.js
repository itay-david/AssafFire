import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Videos() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const smoothMousePosition = useRef({ x: 0, y: 0 });
  const [, setRender] = useState(0); // רק לרינדור מחדש

  const videos = [
    { title: "יצירה מקורית", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "הופעה חיה", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "קטע מרגש", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "אלתור חופשי", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "יצירה קלאסית", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { title: "סט מלא", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const smoothMove = () => {
      smoothMousePosition.current.x +=
        (mousePosition.x - smoothMousePosition.current.x) * 0.15;
      smoothMousePosition.current.y +=
        (mousePosition.y - smoothMousePosition.current.y) * 0.15;

      // גורם לרינדור מחדש כדי לעדכן את האפקטים
      setRender((v) => v + 1);

      animationFrameId = requestAnimationFrame(smoothMove);
    };

    smoothMove();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePosition]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#121212] text-[#eee] pt-24 px-4 relative overflow-hidden"
      style={{ fontFamily: "'Heebo', sans-serif" }}
    >
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 z-0"
        style={{
          background: `radial-gradient(600px circle at ${smoothMousePosition.current.x}px ${smoothMousePosition.current.y}px, 
            rgba(250, 204, 21, 0.03) 0%, 
            rgba(245, 158, 11, 0.02) 30%, 
            rgba(59, 130, 246, 0.015) 60%, 
            transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent"
        >
          הסרטונים שלי
        </motion.h1>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
          {videos.map((video, i) => (
            <VideoCard
              key={i}
              video={video}
              index={i}
              mousePosition={smoothMousePosition.current}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VideoCard({ video, index, mousePosition }) {
  const [isDirectlyHovered, setIsDirectlyHovered] = useState(false);
  const [cardPosition, setCardPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCardPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [cardRef, mousePosition]);

  const isMouseInside =
    mousePosition.x >= cardPosition.x &&
    mousePosition.x <= cardPosition.x + cardPosition.width &&
    mousePosition.y >= cardPosition.y &&
    mousePosition.y <= cardPosition.y + cardPosition.height;

  const relativeMouseX = ((mousePosition.x - cardPosition.x) / cardPosition.width) * 100;
  const relativeMouseY = ((mousePosition.y - cardPosition.y) / cardPosition.height) * 100;

  const distanceToCard = cardRef.current
    ? Math.sqrt(
        Math.pow(mousePosition.x - (cardPosition.x + cardPosition.width / 2), 2) +
          Math.pow(mousePosition.y - (cardPosition.y + cardPosition.height / 2), 2)
      )
    : 1000;

  const isNearCard = distanceToCard < 200 && !isMouseInside;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsDirectlyHovered(true)}
      onMouseLeave={() => setIsDirectlyHovered(false)}
      whileHover={{ y: -5 }}
    >
      {/* בורדר מלא כשעל הכרטיס */}
      {isMouseInside && (
        <div className="absolute -inset-1 rounded-2xl transition-all duration-300 opacity-100 pointer-events-none">
          <div
            className="w-full h-full rounded-2xl"
            style={{
              background: `linear-gradient(45deg, 
                rgba(250, 204, 21, 0.8) 0%, 
                rgba(245, 158, 11, 0.6) 25%, 
                rgba(59, 130, 246, 0.4) 50%, 
                rgba(250, 204, 21, 0.8) 100%)`,
              filter: "blur(1px)",
            }}
          />
        </div>
      )}

      {/* בורדר חלקי כשליד הכרטיס */}
      {isNearCard && (
        <div
          className="absolute -inset-1 rounded-2xl transition-all duration-200 opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(circle 80px at ${relativeMouseX}% ${relativeMouseY}%, 
              rgba(250, 204, 21, ${Math.max(0, 0.6 - distanceToCard / 300)}) 0%,
              rgba(245, 158, 11, ${Math.max(0, 0.4 - distanceToCard / 300)}) 50%,
              transparent 80%)`,
            filter: "blur(1px)",
          }}
        />
      )}

      {/* תוכן הכרטיס */}
      <div className="relative z-10 bg-[#1a1a1a] m-1 rounded-xl overflow-hidden">
        {/* הסרטון */}
        <div className="relative">
          <iframe
            className="w-full aspect-video"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
          />
        </div>

        {/* כותרת */}
        <div className="p-6 relative">
          {/* אפקט אור בכותרת */}
          {isMouseInside && (
            <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none rounded-b-xl opacity-20">
              <div
                style={{
                  background: `radial-gradient(circle 120px at 50% 50%, 
                    rgba(250, 204, 21, 0.3), 
                    transparent 70%)`,
                }}
                className="w-full h-full"
              />
            </div>
          )}

          <motion.h2
            className="text-xl font-semibold mb-2 transition-colors duration-300 relative z-10"
            style={{
              color: isMouseInside ? "#fbbf24" : "#facc15",
            }}
          >
            {video.title}
          </motion.h2>

          {/* קו מלא כשעל הכרטיס או כלום */}
          <div
            className={`h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-300 ${
              isMouseInside ? "w-full opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
