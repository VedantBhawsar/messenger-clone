"use client";

import React, { useState } from "react";
import { Clock, Plus, Music, PlayCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/MusicContext";
import AddSongModal from "./AddSongModal";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlaylist = () => {
  const { playlist, currentSong, play, isPlaying } = useMusic();
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [hoveredSongId, setHoveredSongId] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-lg border-none shadow-lg">
          <CardContent className="p-6">
            <motion.div 
              className="flex items-center justify-between mb-4 px-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm text-gray-400 dark:text-gray-500">#</div>
              <div className="flex-1 ml-4">Title</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
            </motion.div>

            <ScrollArea className="h-[371px] pr-4">
              {playlist?.songs && playlist.songs.length > 0 ? (
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {playlist.songs.map((song, index) => (
                    <motion.div
                      key={song.id}
                      variants={item}
                      className={`flex items-center py-2 px-5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-md group transition-colors mb-1 ${
                        currentSong?.id === song.id ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''
                      }`}
                      onMouseEnter={() => setHoveredSongId(song.id)}
                      onMouseLeave={() => setHoveredSongId(null)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 w-6 flex justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                          {hoveredSongId === song.id ? (
                            <motion.button
                              key="play-button"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => play(song)}
                              className="cursor-pointer"
                            >
                              <PlayCircle className="w-5 h-5" />
                            </motion.button>
                          ) : (
                            <motion.span
                              key="index"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {index + 1}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1 ml-4">
                        <div className={`text-sm font-medium leading-none ${
                          currentSong?.id === song.id ? 
                          'text-indigo-700 dark:text-indigo-400' : 
                          'text-gray-800 dark:text-gray-200'
                        }`}>
                          {song.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {song.artist}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTime(song.duration)}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 py-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Music className="w-16 h-16 mb-3 text-indigo-500/50 dark:text-indigo-400/50" />
                  </motion.div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-lg"
                  >
                    No songs in playlist
                  </motion.p>
                </motion.div>
              )}
            </ScrollArea>
            
            <motion.div 
              className="flex justify-center mt-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAddSongModalOpen(true)}
                  className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add songs
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <AddSongModal 
        isOpen={isAddSongModalOpen}
        onClose={() => setIsAddSongModalOpen(false)}
      />
    </>
  );
};

export default MusicPlaylist;
