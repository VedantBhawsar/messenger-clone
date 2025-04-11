"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsSpotify } from "react-icons/bs";
import { Music, Plus, X } from "lucide-react";
import MusicPlaylist from "./MusicPlaylist";
import MusicPlayerCard from "./MusicPlayerCard";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useMusic } from "@/context/MusicContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Playlist {
  id: string;
  name: string;
  songs: any[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function SpotifyDrawer() {
  const { playlist, setPlaylist } = useMusic();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    try {
      const response = await axios.get("/api/playlists");
      setPlaylists(response.data);
    } catch (error) {
      console.error("Failed to load playlists:", error);
    }
  };

  const handlePlaylistChange = async (playlistId: string) => {
    try {
      const response = await axios.get(`/api/playlists/${playlistId}`);
      setPlaylist(response.data);
    } catch (error) {
      console.error("Failed to load playlist:", error);
    }
  };

  useEffect(()=> {
    if(playlists.length > 0) {
      let plylist = playlists[playlists.length - 1]
      handlePlaylistChange(plylist?.id)
    }
  }, [playlists])

  const handlePlaylistCreated = (newPlaylist: Playlist) => {
    setPlaylists([newPlaylist, ...playlists]);
    setPlaylist(newPlaylist);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 shadow-md hover:shadow-lg hover:shadow-green-500/20 p-0 border-none"
          >
            <BsSpotify
              size={24}
              className="text-white cursor-pointer transition"
            />
          </Button>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-t-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <DrawerHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Music className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
                <DrawerTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                  Listen Together
                </DrawerTitle>
              </motion.div>
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <DrawerDescription className="text-gray-600 dark:text-gray-400">
                {playlist ? `Now playing: ${playlist.name}` : 'Select a playlist to start listening'}
              </DrawerDescription>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Select
                value={playlist?.id}
                onValueChange={handlePlaylistChange}
              >
                <SelectTrigger className="w-full sm:w-[250px] bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-indigo-200 dark:border-indigo-900 focus:ring-indigo-500 dark:focus:ring-indigo-700">
                  <SelectValue placeholder="Select a playlist" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-900">
                  {playlists.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                >
                  <Plus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </Button>
              </motion.div>
            </motion.div>
          </DrawerHeader>
          <motion.div 
            className="px-5 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="md:col-span-1">
              <MusicPlayerCard />
            </div>
            <div className="md:col-span-3">
              <MusicPlaylist />
            </div>
          </motion.div>
        </motion.div>
        <DrawerFooter>
          <motion.div 
            className="w-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-indigo-700 dark:text-indigo-300"
              >
                Close
              </Button>
            </DrawerClose>
          </motion.div>
        </DrawerFooter>
      </DrawerContent>

      <CreatePlaylistModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPlaylistCreated={handlePlaylistCreated}
      />
    </Drawer>
  );
}
