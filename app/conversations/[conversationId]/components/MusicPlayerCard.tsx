"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useMusic } from "@/context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayerCard = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    volume,
    play,
    pause,
    next,
    previous,
    seek,
    setVolume,
  } = useMusic();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSong) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-xl bg-white/20 dark:bg-black/20 border-none shadow-lg">
          <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <motion.p 
              className="text-gray-500 dark:text-gray-400"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              No song selected
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/80 to-white/30 dark:from-gray-900/80 dark:to-gray-900/30 border-none shadow-xl">
        <CardContent className="p-6 flex flex-col items-center">
          {/* Album Art */}
          <motion.div 
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <img
              src={currentSong.albumCover || '/default-album-art.png'}
              alt="Album cover"
              className="w-56 h-56 object-cover rounded-2xl shadow-xl"
            />
            <motion.div 
              className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isPlaying ? pause() : play()}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Song Info */}
          <motion.div 
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
              {currentSong.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{currentSong.artist}</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            className="w-full px-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Slider
              value={[progress]}
              onValueChange={([value]) => seek(value)}
              max={currentSong.duration}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                onClick={previous}
              >
                <SkipBack className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <Button
                variant="default"
                size="icon"
                className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-indigo-700/20 border-none"
                onClick={() => isPlaying ? pause() : play()}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isPlaying ? "pause" : "play"}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                onClick={next}
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Volume Control */}
          <motion.div 
            className="w-full mt-4 flex items-center gap-2 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Volume2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <Slider
              value={[volume * 100]}
              onValueChange={([value]) => setVolume(value / 100)}
              max={100}
              step={1}
              className="w-full"
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MusicPlayerCard;
