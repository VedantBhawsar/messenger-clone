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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Playlist</DialogTitle>
          <DialogDescription>
            Give your playlist a name to get started
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="My Awesome Playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            disabled={!name || loading}
          >
            Create Playlist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 