"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMusic } from "@/context/MusicContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Music, X, Youtube } from "lucide-react";

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSongModal({ isOpen, onClose }: AddSongModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { addSongToPlaylist, playlist } = useMusic();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Basic YouTube URL validation
      if (!url.includes("youtube.com/watch?v=") && !url.includes("youtu.be/")) {
        toast.error("Please enter a valid YouTube URL");
        return;
      }

      // Check if a playlist is selected
      if (!playlist) {
        toast.error("Please select a playlist first");
        return;
      }

      // Extract video ID
      const videoId = url.includes('watch?v=') 
        ? url.split('watch?v=')[1].split('&')[0]
        : url.split('youtu.be/')[1].split('?')[0];

      // Get video details from our API
      const videoDetails = await axios.get(`/api/youtube-info/${videoId}`);
      const { title, duration, channelName } = videoDetails.data;

      const song = {
        title: title,
        artist: channelName,
        duration: duration,
        youtubeUrl: url,
        albumCover: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        playlistId: playlist.id  // Add the playlist ID to the song data
      };

      const response = await axios.post("/api/songs", song);
      
      addSongToPlaylist(response.data);
      toast.success("Song added successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add song");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-none shadow-2xl">
        <div className="absolute right-4 top-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <DialogHeader>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <Youtube className="h-5 w-5 text-red-600" />
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
              Add Song from YouTube
            </DialogTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Enter a YouTube URL to add a song to your playlist
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        <motion.div 
          className="space-y-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="relative">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 pl-10 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 pointer-events-none">
              <Youtube className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
        <DialogFooter>
          <motion.div 
            className="flex gap-2 w-full justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
                className="border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleSubmit}
                disabled={!url || loading || !playlist}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Music className="h-4 w-4 mr-2" />
                  </motion.div>
                ) : (
                  "Add Song"
                )}
              </Button>
            </motion.div>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 