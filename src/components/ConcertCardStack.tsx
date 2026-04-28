import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { ConcertVideo } from "../data/concert";

interface ConcertCardStackProps {
  videos: ConcertVideo[];
  isMobile?: boolean;
  framerActive?: boolean;
}

export default function ConcertCardStack({
  videos,
  isMobile = false,
  framerActive = false,
}: ConcertCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentVideo = videos[currentIndex];
  const thumbnailUrl = `https://img.youtube.com/vi/${currentVideo.embedId}/maxresdefault.jpg`;

  const goToNext = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsPlaying(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsPlaying(false);
    }
  };

  const selectVideo = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const videoContainerClass = isMobile
    ? "w-full px-4"
    : "w-full max-w-5xl px-4";

  const titleClass = isMobile
    ? "text-xl font-bold text-gray-800 mb-2"
    : "text-3xl font-bold text-gray-800 mb-3";

  const descClass = isMobile
    ? "text-sm text-gray-500 leading-relaxed max-w-lg mx-auto"
    : "text-base text-gray-500 leading-relaxed max-w-2xl mx-auto";

  const titleInitial = framerActive ? { opacity: 0, y: -15 } : false;
  const videoInitial = framerActive ? { opacity: 0, scale: 0.97 } : false;
  const descInitial = framerActive ? { opacity: 0, y: 8 } : false;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white">
      <div className="flex flex-col items-center w-full">
        {/* Title */}
        <div className="concert-title text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentIndex}`}
              initial={titleInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className={titleClass}>{currentVideo.title}</h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Video Player */}
        <div className={`concert-video ${videoContainerClass}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`video-${currentIndex}`}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-200"
              initial={videoInitial}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.embedId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`}
                  title={`${currentVideo.title} - YouTube Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={thumbnailUrl}
                    alt={currentVideo.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/25 cursor-pointer"
                    onClick={handlePlay}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.35)" }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-10 h-10 text-gray-800 ml-1" />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Description */}
        <div className="concert-description text-center mt-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${currentIndex}`}
              initial={descInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <p className={descClass}>{currentVideo.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="concert-controls flex items-center gap-4 mt-6">
          <motion.button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </motion.button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {videos.map((video, i) => (
              <motion.button
                key={video.id}
                onClick={() => selectVideo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-gray-800 w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          <motion.button
            onClick={goToNext}
            disabled={currentIndex === videos.length - 1}
            className="p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
