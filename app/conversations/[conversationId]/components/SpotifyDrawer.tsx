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
import { Plus } from "lucide-react";
import MusicPlaylist from "./MusicPlaylist";
import MusicPlayerCard from "./MusicPlayerCard";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useMusic } from "@/context/MusicContext";
import axios from "axios";

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
      console.log(playlists)
      let plylist = playlists[playlists.length - 1]
      handlePlaylistChange(plylist?.id)
    }
  }, [])

  const handlePlaylistCreated = (newPlaylist: Playlist) => {
    setPlaylists([newPlaylist, ...playlists]);
    setPlaylist(newPlaylist);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-100 rounded-full"
        >
          <BsSpotify
            size={28}
            className="text-green-500 hover:text-green-600 cursor-pointer transition"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="space-y-4">
          <DrawerTitle>Listen Together</DrawerTitle>
          <DrawerDescription>
            {playlist ? `Now playing: ${playlist.name}` : 'Select a playlist to start listening'}
          </DrawerDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Select
              value={playlist?.id}
              onValueChange={handlePlaylistChange}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a playlist" />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </DrawerHeader>
        <div className="px-5 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          <div className="md:col-span-1">
            <MusicPlayerCard />
          </div>
          <div className="md:col-span-3">
            <MusicPlaylist />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
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
