import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const MusicPlayerCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([33]);

  return (
    <Card className="backdrop-blur-lg border-none">
      <CardContent className="p-6 flex flex-col items-center">
        {/* Album Art */}
        <div className="relative group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Album cover"
            className="w-56 h-56 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-300"
              onClick={() => setIsPlaying(!isPlaying)}
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
          <h2 className="text-xl font-bold mb-1">Song Title</h2>
          <p className="text-sm text-gray-500 mb-4">Artist Name</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full px-2 mb-4">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-black/5"
          >
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => setIsPlaying(!isPlaying)}
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
          >
            <SkipForward className="w-6 h-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayerCard;
