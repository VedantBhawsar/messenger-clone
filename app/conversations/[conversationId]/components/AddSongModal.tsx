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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Song from YouTube</DialogTitle>
          <DialogDescription>
            Enter a YouTube URL to add a song to your playlist
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!url || loading || !playlist}
          >
            Add Song
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 