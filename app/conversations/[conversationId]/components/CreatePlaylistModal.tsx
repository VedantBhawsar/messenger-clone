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
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ListMusic, X } from "lucide-react";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistCreated?: (playlist: any) => void;
}

export default function CreatePlaylistModal({ 
  isOpen, 
  onClose,
  onPlaylistCreated 
}: CreatePlaylistModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!name.trim()) {
        toast.error("Please enter a playlist name");
        return;
      }

      const response = await axios.post("/api/playlists", { name });
      
      toast.success("Playlist created successfully!");
      if (onPlaylistCreated) {
        onPlaylistCreated(response.data);
      }
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create playlist");
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
            <ListMusic className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <DialogTitle className="text-xl font-bold music-text-gradient">
              Create New Playlist
            </DialogTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Give your playlist a name to get started
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
              placeholder="My Awesome Playlist"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 pl-10 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 dark:text-indigo-400 pointer-events-none">
              <ListMusic className="h-4 w-4" />
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
                disabled={!name || loading}
                className="music-btn"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <ListMusic className="h-4 w-4 mr-2" />
                  </motion.div>
                ) : (
                  "Create Playlist"
                )}
              </Button>
            </motion.div>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 