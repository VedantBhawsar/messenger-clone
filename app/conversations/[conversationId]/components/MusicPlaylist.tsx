"use client";

import React, { useState } from "react";
import { Clock, Plus, Music } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/MusicContext";
import AddSongModal from "./AddSongModal";

const MusicPlaylist = () => {
  const { playlist, currentSong, play, isPlaying } = useMusic();
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card className="w-full text-black rounded-none border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4 px-5">
            <div className="text-sm text-gray-400">#</div>
            <div className="flex-1 ml-4">Title</div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <ScrollArea className="h-[371px] pr-4">
            {playlist?.songs.map((song, index) => (
              <div
                key={song.id}
                className={`flex items-center py-2 px-5 hover:bg-black/10 group transition-colors border-b ${
                  currentSong?.id === song.id ? 'bg-black/5' : ''
                }`}
              >
                <div className="text-sm text-neutral-600 w-6">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <button
                    onClick={() => play(song)}
                    className="group-hover:block hidden cursor-pointer"
                  >
                    <Music className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 ml-4">
                  <div className="text-sm font-medium leading-none">
                    {song.title}
                  </div>
                  <div className="text-sm text-neutral-600 mt-1">
                    {song.artist}
                  </div>
                </div>
                <div className="text-sm text-neutral-600">
                  {formatTime(song.duration)}
                </div>
              </div>
            ))}
            
            {(!playlist?.songs || playlist.songs.length === 0) && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Music className="w-12 h-12 mb-2" />
                <p>No songs in playlist</p>
              </div>
            )}
          </ScrollArea>
          
          <div className="flex justify-center mt-5">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddSongModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add songs
            </Button>
          </div>
        </CardContent>
      </Card>

      <AddSongModal 
        isOpen={isAddSongModalOpen}
        onClose={() => setIsAddSongModalOpen(false)}
      />
    </>
  );
};

export default MusicPlaylist;
