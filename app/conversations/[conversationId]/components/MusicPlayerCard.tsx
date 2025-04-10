"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useMusic } from "@/context/MusicContext";

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
      <Card className="backdrop-blur-lg border-none">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px]">
          <p className="text-gray-500">No song selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-lg border-none">
      <CardContent className="p-6 flex flex-col items-center">
        {/* Album Art */}
        <div className="relative group cursor-pointer">
          <img
            src={currentSong.albumCover || '/default-album-art.png'}
            alt="Album cover"
            className="w-56 h-56 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300"
              onClick={() => isPlaying ? pause() : play()}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Song Info */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold mb-1">{currentSong.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-2 mb-4">
          <Slider
            value={[progress]}
            onValueChange={([value]) => seek(value)}
            max={currentSong.duration}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-black/5"
            onClick={previous}
          >
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => isPlaying ? pause() : play()}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white" />
            ) : (
              <Play className="w-7 h-7 text-white ml-1" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-black/5"
            onClick={next}
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="w-full mt-4 flex items-center gap-2 px-2">
          <Volume2 className="w-4 h-4 text-gray-500" />
          <Slider
            value={[volume * 100]}
            onValueChange={([value]) => setVolume(value / 100)}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayerCard;
