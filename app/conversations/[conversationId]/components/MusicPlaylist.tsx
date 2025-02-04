import React from "react";
import { Clock, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { BsPlay } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const songs = [
  { id: 1, title: "Do You Know", artist: "Diljit Dosanjh", duration: "3:32" },
  { id: 2, title: "Faraar", artist: "Diljit Dosanjh", duration: "3:13" },
  {
    id: 3,
    title: "Kylie & Kareena",
    artist: "Diljit Dosanjh",
    duration: "2:47",
  },
  { id: 4, title: "Taare", artist: "Diljit Dosanjh", duration: "3:23" },
  { id: 5, title: "Peed", artist: "Diljit Dosanjh", duration: "4:24" },
  { id: 4, title: "Taare", artist: "Diljit Dosanjh", duration: "3:23" },
  { id: 5, title: "Peed", artist: "Diljit Dosanjh", duration: "4:24" },
  { id: 4, title: "Taare", artist: "Diljit Dosanjh", duration: "3:23" },
  { id: 5, title: "Peed", artist: "Diljit Dosanjh", duration: "4:24" },
  { id: 4, title: "Taare", artist: "Diljit Dosanjh", duration: "3:23" },
  { id: 5, title: "Peed", artist: "Diljit Dosanjh", duration: "4:24" },
  { id: 4, title: "Taare", artist: "Diljit Dosanjh", duration: "3:23" },
  { id: 5, title: "Peed", artist: "Diljit Dosanjh", duration: "4:24" },
];

const MusicPlaylist = () => {
  return (
    <Card className="w-full  text-black rounded-none border-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 px-5">
          <div className="text-sm text-gray-400">#</div>
          <div className="flex-1 ml-4">Title</div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <ScrollArea className="h-[371px] pr-4">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center py-2 px-5 hover:bg-black/10 group transition-colors border-b"
            >
              <div className="text-sm text-neutral-600 w-6">
                <span className="group-hover:hidden">{song.id}</span>
                <button
                  onClick={() => {
                    alert("hellow");
                  }}
                  className="group-hover:block hidden cursor-pointer"
                >
                  <BsPlay size={20} />
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
              <div className="text-sm text-neutral-600">{song.duration}</div>
            </div>
          ))}
          <div className="flex justify-center mt-5">
            <Button variant={"outline"} size={"sm"}>
              <Plus /> Add songs
            </Button>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MusicPlaylist;
